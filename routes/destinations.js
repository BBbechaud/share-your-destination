const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const destinationsController = require("../controllers/destinations");
const { ensureAuth } = require("../middleware/auth");

//Destination Routes
//Since linked from server js treat each path as:
//destination/:id, destination/createDestination, destination/likeDestination/:id, destination/deleteDestination/:id

router.get("/:id", ensureAuth, destinationsController.getDestination);

//Enables user to create destination w/ cloudinary for media uploads
router.post("/createDestination", upload.single("file"), destinationsController.createDestination);

//Enables user to like destination. In controller, uses Destination model to update likes by 1
router.put("/likeDestination/:id", destinationsController.likeDestination);

//Enables user to delete destination. In controller, uses Destination model to delete destination from MongoDB collection
router.delete("/deleteDestination/:id", destinationsController.deleteDestination);

module.exports = router;
