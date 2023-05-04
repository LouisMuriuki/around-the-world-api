import Tour from "../mongo/models/tours.js";

const aliasCheapTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "price,-ratingsAverage"; //ratings from the lowest
  req.query.fields = "name,price,ratingAverage,summary,difficulty";
  next();
};

const getTours = async (req, res) => {
  try {
    //Build query
    //1) Filtering
    const query = { ...req.query }; //make a copy in order to be able to exclude some queries
    const excludedfields = ["page", "sort", "limit", "fields"];
    excludedfields.forEach((el) => delete query[el]);

    //2) Advanced filtering
    //for gte,lte,lt,gt
    console.log(req.query, query);
    let querystr = JSON.stringify(query);
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(querystr));

    let somequery = Tour.find(JSON.parse(querystr));

    //3) Sorting
    // if (req.query.sort) {
    //   somequery = somequery.sort(req.query.sort);
    // }
    // incase of a seconf argument to break the tie
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      somequery = somequery.sort(sortBy);
    } else {
      somequery = somequery.sort("-createdAt");
    }

    //4) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      somequery = somequery.select(fields);
    } else {
      somequery = somequery.select("-__v"); //remove this field
    }

    //5) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    somequery = somequery.skip(skip).limit(limit);

    //if the page doesnot exists
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) {
        throw new Error("This page does not exist");
      }
    }

    //Execute Query
    const data = await somequery;
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }

  res.status();
};
const getTour = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Tour.findById(id);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }

  res.status();
};

const createTour = async (req, res) => {
  console.log(req);
  try {
    const { name, rating, price } = req.body;
    const createTour = await Tour.create({
      name,
      rating,
      price,
    });
    console.log(createTour);
    res.status(201).json({ success: true, data: createTour });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};
const updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await Tour.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};
const deleteTour = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Tour.findByIdAndDelete(id);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

//agregation pipeline
const getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: "$rating Average",
          numTours: { $sum: 1 },
          numRating: { $sum: "$ratingQuantity" },
          avgRating: { $avg: "$ratingAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);
    res.status(201).json({ success: true, data: { stats } });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};
//might fail coz my stats array is empty
const getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numTourstStarts: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      { $addFields: { month: "$_id" } },
      { $project: { _id: 0 } },
      { $sort: { numTourStats: -1 } },
      { $limit: 12 },
    ]);
    res.status(201).json({ success: true, data: { plan } });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

export {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasCheapTours,
  getTourStats,
  getMonthlyPlan,
};
