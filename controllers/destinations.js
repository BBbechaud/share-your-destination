const cloudinary = require("../middleware/cloudinary");
const Destination = require("../models/Destination");

module.exports = {
  getProfile: async (req, res) => { 
    console.log(req.user)
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const destination = await Destination.find({ user: req.user.id }).sort({ createdAt: "desc" });
      //Sending post data from mongodb and user data to ejs template
      res.render("profile.ejs", { destination: destination, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getDestination: async (req, res) => {
    try {
      //id parameter comes from the post routes
      //router.get("/:id", ensureAuth, postsController.getPost);
      //http://localhost:2121/post/631a7f59a3e56acfc7da286f
      //id === 631a7f59a3e56acfc7da286f
      const destination = await Destination.findById(req.params.id);
      res.render("destination.ejs", { destination: destination, user: req.user});
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {

      const destination = await Destination.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { destination: destination });
    } catch (err) {
      console.log(err);
      
    
    }
  },
  createDestination: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content 
      await Destination.create({
        location: req.body.location,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        localLanguage: req.body.localLanguage,
        localCurrency: req.body.localCurrency,
        reason: req.body.reason,
        user: req.user.id,
      });
      console.log("Destination has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  favoritePost: async (req, res) => {
    try {
      await Destination.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteDestination: async (req, res) => {
    try {
      // Find post by id
      let destination = await Destination.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(destination.cloudinaryId);
      // Delete post from db
      await Destination.remove({ _id: req.params.id });
      console.log("Deleted Destination");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
