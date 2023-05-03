import Tour from "../mongo/models/tours.js";

const getTours = async (req, res) => {
  try {
    const data = await Tour.find({});
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
const deleteTour = async(req, res) => {
  try {
    const id = req.params.id;
   
    const data = await Tour.findByIdAndDelete(id);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

export { getTours, getTour, createTour, updateTour, deleteTour };
