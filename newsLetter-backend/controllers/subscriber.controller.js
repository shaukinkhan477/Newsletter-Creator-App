const Subscriber = require("../models/subscriber.model");

// GET all your subscribers
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    return res.json({ subscribers });
  } catch (error) {
    console.error("GetAllSubscribers error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add one subscriber (to your list)
exports.addSubscriber = async (req, res) => {
  try {
    const { email, name } = req.body;

    // check uniqueness per user
    const existing = await Subscriber.findOne({
      user: req.user.id,
      email
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Subscriber with this email already exists" });
    }

    const newSub = await Subscriber.create({
      email,
      name,
      user: req.user.id
    });
    return res
      .status(201)
      .json({ message: "Subscriber added", subscriber: newSub });
  } catch (error) {
    console.error("AddSubscriber error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete one subscriber (from your list)
exports.deleteSubscriber = async (req, res) => {
  try {
    const removed = await Subscriber.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    if (!removed) {
      return res.status(404).json({ message: "Subscriber not found" });
    }
    return res.json({ message: "Subscriber deleted" });
  } catch (error) {
    console.error("DeleteSubscriber error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
