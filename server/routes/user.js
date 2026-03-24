const router = require("express").Router();
const User = require("../model/User");

router.post("/sync-user", async (req, res) => {

  const { clerkId, email } = req.body;

  let user = await User.findOne({ clerkId });

  if (!user) {

    user = await User.create({
      clerkId,
      email
    });

  }

  res.json(user);
});

router.get("/role/:clerkId", async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    res.json({ role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user role" });
  }
});

router.get("/:clerkId", async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("clerkId email firstName lastName role -_id");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.patch("/:clerkId/role", async (req, res) => {
  const { role } = req.body;
  const allowedRoles = ["user", "admin"];

  if (!role || !allowedRoles.includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { clerkId: req.params.clerkId },
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Role updated", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user role" });
  }
});

router.delete("/:clerkId", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ clerkId: req.params.clerkId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;