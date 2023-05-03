import mongoose from "mongoose";

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"], //validator
    unique: true,
    trim:true
  },
  duration: {
    type: Number,
    required: [true, "A tour must have a duration"], //validator
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a maxGroupSize"], //validator
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"], //validator
  },
  ratingAverage: { type: Number, default: 4.5 },
  ratingQuantity: { type: Number, default: 0 },
  price: { type: Number, required: [true, "A tour must have a price"] },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description:{
    type:String,
    required: [true, "A tour must have a description"], //validator
  },
  imageCover:{
    type:String,
    required: [true, "A tour must have a Image"],
  },
  images:[String],
  createdAt:{
    type:Date,
    default:Date.now()
  },
  startDate:[Date]

});

const Tour = mongoose.model("Tour", toursSchema);

export default Tour;
