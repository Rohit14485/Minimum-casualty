require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const User = require("./model/user");
const auth = require("./middleware/auth");
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const bodyParser = require("body-parser");
const { exec } = require('child_process');
const accountSid = '<your twilio account sid>';
const authToken = '<your twilio auth token>';
const nodeCmd = require('node-cmd');


const morgan = require('morgan');
// const { Long } = require('mongodb');
const client = require('twilio')(accountSid, authToken);


// app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.post("/register", async (req, res) => {
  try {
    const { Name, email, password } = req.body;

    if (!(email && password && Name)) {
      res.status(400).send("All fields are required");
    }

    const existingUser = await User.findOne({ email }); // PROMISE

    if (existingUser) {
      res.status(401).send("User already exists");
    }

    const myEncPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      Name,
      email: email.toLowerCase(),
      password: myEncPassword,
    });

    //token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    //update or not in DB

    // handle password situation
    user.password = undefined;

    setTimeout(() => {
      res.status(201).redirect(`/login`);
    }, 2000);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body.email);
    console.log(req.body.password);
    if (!(email && password)) {
      return res.status(400).send("Email and password are required");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      user.password = undefined;
      // res.status(200).json(user);

      // if you want to use cookies
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res
        .status(200)
        .cookie("token", token, options)
        .redirect("/dashboard");

      //return res.status(200).redirect("/dashboard");
    }

    return res.status(400).redirect("/login");
  } catch (error) {
    console.log(error);

    res.status(500).send("Internal Server Error");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });

  // Send a response
  res.redirect("/");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  const station = req.body.locations;
  const video = req.body.video;
  
if(video=="golive"){
  let command = `python main.py --prototxt mobilenet_ssd/MobileNetSSD_deploy.prototxt --model mobilenet_ssd/MobileNetSSD_deploy.caffemodel  --place public/${station}.csv`;
  command = command.replace(' .csv', '.csv'); 
  exec(command, (err, data, stderr) => {
    if (err) {
      console.error(`Error: ${err}`);
      return;
    }
    console.log(data);
  });

}

else{
 let command = `python main.py --prototxt mobilenet_ssd/MobileNetSSD_deploy.prototxt --model mobilenet_ssd/MobileNetSSD_deploy.caffemodel --input videos/${video} --place public/${station}.csv`;
  command = command.replace(' .csv', '.csv'); 
  exec(command, (err, data, stderr) => {
    if (err) {
      console.error(`Error: ${err}`);
      return;
    }
    console.log(data);
  });
}
 


});


app.post('/message', (req,res) => {
    
  var loc = `${req.body.lon} `+ " "+ `${req.body.lat}`;
  console.log(loc);

client.messages
.create({
  body: loc + 'SOS message please send help',
  from: '+14693363509',
  to: '+919211403344'
})
.then((res) => console.log('message sent', res))
.catch((err) => {console.log(err)})
});


let admin;

app.get("/dashboard", auth, (req, res) => {
  admin = req.user.isAdmin;
  console.log(admin);
  if (admin) {
    res.render("Admin");
  } else {
    res.render("User");
  }
});

app.get("/", (req, res) => {
  res.render("dashboard");
});

app.get("/login", (req, res) => {
  res.render("login_register");
});

app.get("/register", (req, res) => {
  res.render("login_register");
});

app.get("/Bomb", (req, res) => {
  if (admin) {
    res.render("");
  } else {
    res.render("UserBomb");
  }
});

app.get("/tsunami", (req, res) => {
  if (admin) {
    res.render("");
  } else {
    res.render("tsunami");
  }
});

app.get("/adminVideo", (req, res) => {
  res.render("admin_head");
});


module.exports = app;
