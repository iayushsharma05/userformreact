const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


// const cors = require('cors');
const app = express();
const mongourl = 'mongodb+srv://ayush0123sh:lOqpnQy3MNzFUfJz@cluster0.fdxb8e7.mongodb.net/userdetails?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongourl);


// app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


const { Userauth } = require('./server/models/userauth');
const { ToastContainer, toast } = require('react-toastify');



let authenticate = (req,res,next) =>{
  let token = req.cookies.mycookie;

   if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login first"
    });
  }

  Userauth.findByToken(token, (err, userDoc) => { 
       if(err || !userDoc) {
        return res.status(401).json({success:false ,message:'Please Login First!'})
       }
       next();
    }) 
}



app.post("/user/logout" ,(req,res)=>{
  res.clearCookie("mycookie",{
    httpOnly:true,
    sameSite:"lax"
  });
  return res.status(200).json({
    success:true,
    message: "Logout Success !"
  });
})

app.post('/user/signupuser', async (req, res) => {
  try {

    const uname = req.body.usernameauth;
    const email = req.body.mailauth;
    const phone = req.body.phoneauth;

    let message = "";
    const existuname = await Userauth.findOne({ uname });
    if (existuname) {
      message += "Username ,";
    }
    else {
      console.log("Username does not exist");
    }

    const existemail = await Userauth.findOne({ email });
    if (existemail) {
      message += "Email ,";
    }
    else {
      console.log("Email does not exist");
    }

    const existphone = await Userauth.findOne({ phone });
    if (existphone) {
      message += "Phone ,";
    }
    else {
      console.log("Phoneno does not exist");
    }

    if (message === "") {
    }
    else {
      return res.status(409).json({ success: false, message: message + ' already registered!' });
    }


    const authuser = new Userauth({
      uname: req.body.usernameauth,
      email: req.body.mailauth,
      phone: req.body.phoneauth,
      password: req.body.passwordauth
    });
    const doc = await authuser.save();
    console.log("User created !");
    console.log(doc);
    return res.status(200).json({ success: true, message: 'User created !' });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Something went wrong while signing up!' });
  }

});

// login section 

app.post('/user/login', async (req, res) => {
  try {
    const { usernameauth, passwordauth } = req.body;

    // 1️⃣ Find user by email
    const user = await Userauth.findOne({ $or: [{ email: usernameauth }, { uname: usernameauth }] });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    // 2️⃣ Compare password using schema method
    user.comparepassword(passwordauth, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error while comparing password"
        });
      }

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid password"
        });
      }

      // 3️⃣ Login success
      user.generatetoken((err, user) => {
        if (err) throw err;
        
        res.cookie('mycookie', user.token);

        return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          uname: user.uname,
          email: user.email
        }
      });

      })
      
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});
const UserSchema = mongoose.Schema({
  username: String,
  fname: String,
  gender: String,
  mail: String,
  dob: Date,
  phone: String,
})


const User = mongoose.model('User', UserSchema)
app.post('/user/adduser', authenticate ,async (req, res) => {
  try {
    const addUser = new User({
      username: req.body.username,
      fname: req.body.fname,
      gender: req.body.gender,
      mail: req.body.mail,
      dob: req.body.dob,
      phone: req.body.phone
    });
    const newUser = await addUser.save();
    console.log("User record saved in MongoDB");
    console.log(newUser);
    res.sendStatus(200);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "FAILED To Save User"});
  }
});

// new fetch all or fetch one
app.post('/user/getallusersnew', authenticate , async (req, res) => {
  try {
    const searched_user_name = (req.body.user_name || '').toLowerCase();
    let docs;
    if (!searched_user_name) {
      // fetch all
      docs = await User.find({});
    }
    else {
      // fetch one
      docs = await User.find({ username: searched_user_name });
    }
    //console.log("server response");
    //console.log(res.json(docs));
    return res.json(docs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error fetching users' })
  }
})


app.post('/user/deleteuserbyid',authenticate, async (req, res) => {
  try {
    const id = req.body.userid;
    let doc = await User.findByIdAndDelete({ _id: id });
    if (!doc) {
      return res.status(404).json({ message: "User Not Found " });
    }
    return res.json({ message: " deleted ", id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Deteting User" });
  }
})


app.post('/user/updateuser',authenticate, async (req, res) => {
  try {
    const id = req.body.id;
    const update = {};

    update.username = req.body.username;
    update.fname = req.body.fname;
    update.gender = req.body.gender;
    update.mail = req.body.mail;
    update.phone = req.body.phone;
    update.dob = req.body.dob;

    let updatedoc = await User.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    )
    return res.json(updatedoc);

  } catch (error) {
    console.error("Error Updating User" + res.data);

  }
})


app.post("/user/showuserbyid",authenticate, async (req, res) => {

  
  const user = await User.findById(req.body.userid);
  res.json(user);
});








const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
// mongodb+srv://ayush0123sh:lOqpnQy3MNzFUfJz@cluster0.fdxb8e7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// Password:  lOqpnQy3MNzFUfJz