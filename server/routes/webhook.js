const express = require("express");
const router = express.Router();
const { Webhook } = require("svix");

const User = require("../model/User"); 

router.post("/", async (req, res) => {
  const payload = req.body; //save user data 
  const headers = req.headers; //verification details such as timestamps and signatures

  const wh = new Webhook(process.env.CLERK_SECRET_KEY);

  let event;

  try {
    event = wh.verify(JSON.stringify(payload), headers);
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return;
  }

  console.log("Webhook triggered:", event.type);

  try {
    if (event.type === "user.created") {
      const user = event.data;

      await User.create({
        clerkId: user.id,
        email: user.email_addresses?.[0]?.email_address || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        role: "user"
      });

      console.log("User saved to MongoDB");
    }

    if (event.type === "user.deleted") {
      const user = event.data;

      await User.findOneAndDelete({
        clerkId: user.id
      });

      console.log("User removed from MongoDB");
    };

    if (event.type === "user.updated") {
      const user = event.data;
      await User.findOneAndUpdate(
        { clerkId: user.id },
        {
          email: user.email_addresses?.[0]?.email_address || "",
          firstName: user.first_name || "",
          lastName: user.last_name || ""
        }
      )};

      console.log("User updated in MongoDB");

  } catch (error) {
    console.error("Webhook processing error:", error);
  }
});

module.exports = router;