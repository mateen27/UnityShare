const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to the Database');
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

module.exports = connectDatabase;
