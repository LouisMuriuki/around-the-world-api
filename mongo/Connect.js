import mongoose from "mongoose";
const connectDb = (URL) => {
  mongoose
    .connect(URL)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
};
export default connectDb;

