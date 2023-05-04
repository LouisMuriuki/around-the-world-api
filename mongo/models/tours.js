import mongoose from "mongoose";
import slugify from "slugify";
const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"], //validator
      unique: true,
      trim: true,
    },
    slug: String,
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
    description: {
      type: String,
      required: [true, "A tour must have a description"], //validator
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a Image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, //remove this from response
    },
    startDate: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtual propety-properties we dont need to save to the db
toursSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

//document middleware- before .create

toursSchema.pre("save", function (next) {
  console.log(this); // this-document being saved
  this.slug = this.name.toLowerCase().replace(/ /g, "-");
  next();
});

//after doc is saved no access to this but has access to doc
toursSchema.post("save", function (doc,next) {
  console.log(doc); // this-document being saved
  // this.slug = this.name.toLowerCase().replace(/ /g, "-");
  next();
});

const Tour = mongoose.model("Tour", toursSchema);

export default Tour;
