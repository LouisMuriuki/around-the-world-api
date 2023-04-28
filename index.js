import express from "express";
import connectDb from "./mongo/Connect.js";
import * as dotenv from "dotenv";
import cors from "cors";
import toursRoutes from "./routes/toursRoutes.js";
dotenv.config();

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use("api/v1/tours",toursRoutes)

app.get("/", async (req, res) => {
  res.status(200).send("hello world");
});

const startServer = async () => {
  try {
    connectDb(process.env.MONGO_URL);
    console.log(process.env.MONGO_URL);
    app.listen(8080, () => {
      console.log("we up");
    });
  } catch (error) {
    console.log(error)
  }
};
startServer();
