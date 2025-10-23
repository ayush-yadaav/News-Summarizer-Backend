import mongoose from "mongoose";
import { DB_NAME } from "../constent.js";
// export const connectDB = async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//     console.log("✅ MongoDB Connected Successfully");
//   } catch (err) {
//     console.error("❌ MongoDB Connection Failed", err.message);
//     process.exit(1);
//   }
// };



let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("🟢 Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    throw new Error("MongoDB connection failed");
  }
};
