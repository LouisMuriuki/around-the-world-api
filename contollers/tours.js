import Tour from "../mongo/models/tours.js";

const getTours = (req, res) => {

};

const createTour = async (req, res) => {
    console.log(req)
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
    res.status(500).json({ success: false, data: error});
  }
};
const updateTour = (req, res) => {};
const deleteTour = (req, res) => {};

export { getTours, createTour, updateTour, deleteTour };
