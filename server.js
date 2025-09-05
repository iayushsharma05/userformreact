const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { redirect } = require('react-router-dom');


const cors = require('cors');

const mongourl = 'mongodb+srv://ayush0123sh:lOqpnQy3MNzFUfJz@cluster0.fdxb8e7.mongodb.net/userdetails?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongourl);

app.use(cors());
app.use(bodyParser.json());

const UserSchema = mongoose.Schema({
  username: String,
  fname: String,
  gender: String,
  mail: String,
  dob: Date,
  phone: String,

})

const User = mongoose.model('User', UserSchema)

app.post('/adduser', async (req, res) => {
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
    res.status(500).json({ message: "faild To Save User", error: error });
  }
});


// new fetch all or fetch one
app.post('/getallusersnew' , async(req, res) => {
  try {
    const searched_user_name = (req.body.user_name || '').toLowerCase();
    let docs;
    if(!searched_user_name) {
      // fetch all
      docs = await User.find({});
    }
    else {
      // fetch one
      docs = await User.find({ username: searched_user_name} );
    }
    //console.log("server response");
    //console.log(res.json(docs));
    return res.json(docs);

  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'error fetching users'})
  }
})


app.post('/deleteuserbyid',async(req,res) =>{
  try {
     const id = req.body.userid;
     let doc = await User.findByIdAndDelete({_id:id});
     if(!doc){
      return res.status(404).json({message:"User Not Found "});
     }
     return res.json({message:" deleted ",id});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Error Deteting User"});
  }
})


const PORT = process.env.PORT || 3020;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// mongodb+srv://ayush0123sh:lOqpnQy3MNzFUfJz@cluster0.fdxb8e7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// Password:  lOqpnQy3MNzFUfJz