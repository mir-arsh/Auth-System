const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const webhookRoutes = require("./routes/webhook");
const userRoutes = require("./routes/user");

require("dotenv").config();
  
const app = express();

app.use(cors());
app.use(express.json());

app.use("/webhook", webhookRoutes);
app.use("/api/users", userRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected!"));

app.listen(5000, () => {
  console.log("Server running on port 5000!");
});