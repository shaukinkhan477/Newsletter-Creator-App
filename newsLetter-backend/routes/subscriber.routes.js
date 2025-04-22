const express = require("express");
const router = express.Router();
const subscriberController = require("../controllers/subscriber.controller");
const { protect } = require("../middlewares/auth.middleware");

// **Protect all subscriber routes**
router.use(protect);

// GET your subscribers
router.get("/", subscriberController.getAllSubscribers);
// POST: add one of yours
router.post("/", subscriberController.addSubscriber);
// DELETE one of yours
router.delete("/:id", subscriberController.deleteSubscriber);

module.exports = router;
