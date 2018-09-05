const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// DB config for mongoose
const db = require("./config/key").mongoURL;

// Connect to MongoDB
mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(() => console.log("MongoDB connected") )
    .catch( err => console.log(err) );

app.get("/",(req,res)=>{
    res.send("hello");
});

// Use routes
app.use("/api/users",users);
app.use("/api/profile",profile);
app.use("/api/posts",posts);

const port = process.env.PORT || 3000;

app.listen(port , () => console.log("server running on port: " + port ));