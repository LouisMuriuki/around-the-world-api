import * as dotenv from "dotenv";
import connectDb from "./mongo/Connect.js";
import Tour from "./mongo/models/tours.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
dotenv.config();
const Connect = async () => {
  try {
    await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
Connect();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tourslocal.json`, "utf-8")
);

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("data imported");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
const DeleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("data deleted");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  DeleteData();
}
