const Tour = require("../models/tourModel");
const mongoose = require("mongoose");

// GET /tours
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find({}).sort({ createdAt: -1 });
    if (tours) {
      res.status(200).json(tours);
    } else {
      res.status(404).json({ message: "No tours found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to retrieve tours" });
  };
};

// POST /tours
const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create({ ...req.body }); // Spread the req.body object
    if (newTour) {
      res.status(201).json(newTour); // 201 Created
    } else {
      // Handle error (e.g., failed to create tour)
      res.status(400).json({ message: "Invalid tour data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to create tour" });
  };
};

// GET /tours/:tourId
const getTourById = async (req, res) => {
  const {tourId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }

  try {
    const tour = await Tour.findById(tourId);
    if (tour) {
      res.status(200).json(tour);
    } else {
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to retrieve tour" });
  }
};

// PUT /tours/:tourId
const updateTour = async (req, res) => {
  const {tourId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }
  try {
    const updatedTour = await Tour.findOneAndUpdate(
      {_id: tourId},
      { ...req.body }, 
      {new: true, overwrite: true}
      ); // Spread the req.body object
  
    if (updatedTour) {
      res.status(200).json(updatedTour);
    } else {
      // Handle update failure (e.g., tour not found)
      res.status(404).json({ message: "Tour not found" });
    }

  } catch (error) {
    res.status(500).json({ message: "Server error, failed to update tour" });
   }

};

// DELETE /tours/:tourId
const deleteTour = async (req, res) => {
  const {tourId} = req.params;
  if (!mongoose.Types.ObjectId.isValid(tourId)) {
    return res.status(400).json({ message: "Invalid tour ID" });
  }
  
  const isDeleted = await Tour.findOneAndDelete({_id: tourId});

  try {
    if (isDeleted) {
      res.status(204).send(); // 204 No Content
    } else {
      // Handle deletion failure (e.g., tour not found)
      res.status(404).json({ message: "Tour not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error, failed to delete tour" });
  };
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
