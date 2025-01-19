// controllers/subscriber.controller.js
const Subscriber = require("../models/subscriber.model");

// GET all subscribers
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    return res.json({ subscribers });
  } catch (error) {
    console.error("GetAllSubscribers error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add subscriber
exports.addSubscriber = async (req, res) => {
  try {
    const { email, name } = req.body;
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Subscriber with this email already exists" });
    }
    const newSub = await Subscriber.create({ email, name });
    return res
      .status(201)
      .json({ message: "Subscriber added", subscriber: newSub });
  } catch (error) {
    console.error("AddSubscriber error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete subscriber
exports.deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Subscriber.findByIdAndDelete(id);
    if (!removed) {
      return res.status(404).json({ message: "Subscriber not found" });
    }
    return res.json({ message: "Subscriber deleted" });
  } catch (error) {
    console.error("DeleteSubscriber error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
