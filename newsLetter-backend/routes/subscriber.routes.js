// routes/subscriber.routes.js
const express = require("express");
const router = express.Router();
const subscriberController = require("../controllers/subscriber.controller");

// GET /api/subscribers
router.get("/", subscriberController.getAllSubscribers);

// POST /api/subscribers
router.post("/", subscriberController.addSubscriber);

// DELETE /api/subscribers/:id
router.delete("/:id", subscriberController.deleteSubscriber);

module.exports = router;
