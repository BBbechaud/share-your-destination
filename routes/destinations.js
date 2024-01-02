const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const destinationsController = require("../controllers/destinations");
const { ensureAuth } = require("../middleware/auth");

//Post Routes
//Since linked from server js treat each path as:
//post/:id, post/createPost, post/likePost/:id, post/deletePost/:id
router.get("/:id", ensureAuth, destinationsController.getDestination);

//Enables user to create post w/ cloudinary for media uploads
router.post("/createDestination", upload.single("file"), destinationsController.createDestination);

//Enables user to like post. In controller, uses POST model to update likes by 1
// router.put("/likePost/:id", destinationsController.likePost);

//Enables user to delete post. In controller, uses POST model to delete post from MongoDB collection
router.delete("/deleteDestination/:id", destinationsController.deleteDestination);

module.exports = router;
