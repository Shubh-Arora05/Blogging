require('dotenv').config(); // Load .env in local development

const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    // Use env variable or fallback (optional)
    const uri = process.env.MONGODB_URL || 'mongodb+srv://shubharoraofficial05:DIQoec3BRzuGzDDo@cluster0.yuskbns.mongodb.net/your-db-name';

    if (!uri) {
      throw new Error("❌ MONGODB_URL not found");
    }

    await mongoose.connect(uri); // ✅ No deprecated options
    console.log("✅ CONNECTED TO DB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = connectdb;
