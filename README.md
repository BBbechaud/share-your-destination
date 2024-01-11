# share-your-destination

# Description
  This project allows users to create accounts/login to their profile. Once logged in, users can create a post that includes several details about their desired destination such as location, local currency, a photo, and more. The destination will be displayed on the users profile as well as a public feed for other logged in users to view. Users may delete their own posts or like others on the feed.

  The following technologies were used to build this app: Node.js, Express, MongoDB with Mongoose, EJS, Bootstrap, and various middleware (for authentication and storing images).

  Some challenges I faced were user authentication and creating a public feed as they were both first time uses. Linking each user to the feed and having their own posts be recoginized caused some trouble but was figured out through reading docs and trial and error. One improvment to the app could be a way to hide posts from the feed by adding a hidden property to the destination schema. Also better layout and design as I started with Bootstrap but found myself wanting to change styles a bit which made it more difficult to acheive the look I desired.


# How to use 
  Simply create an account and create your destinations.

# How to install and run locally 

  # Install

  `npm install`

  # Things to add

  - Create a `.env` file in config folder and add the following as `key = value`
    - PORT = (can be any port example: 3000)
    - DB_STRING = `your database URI`
    - CLOUD_NAME = `your cloudinary cloud name`
    - API_KEY = `your cloudinary api key`
    - API_SECRET = `your cloudinary api secret`

  # Run

  `npm start`
