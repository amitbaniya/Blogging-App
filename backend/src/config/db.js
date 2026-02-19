import { connect } from "mongoose";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
