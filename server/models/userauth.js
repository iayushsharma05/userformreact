const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const SALT_I = 10;

const userSchema = mongoose.Schema({
    uname: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    // token:{
    //     type:String,
    //     required:true
    // }
    
});

userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_I, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            })
        })
    }
    else {
        next();
    }
});

// LOGIN COMPARE PASS FUNCTION
userSchema.methods.comparepassword = function(passtocheck,cb){
    bcrypt.compare(passtocheck,this.password,function(err,isMatch){
        if(err){
            cb(err);
        }
        cb(null,isMatch);
    })
}

const secret = 'thisissecret';
// Generate Function Token for a User 
userSchema.methods.generatetoken = async function(cb){
    var user = this;

    const token = jwt.sign(user.email,secret);
    
    user.token = token;

    try {
            await user.save();
            cb(null,user);
    } catch (error) {
        if(error) return cb(error);
    }
} 


userSchema.statics.findByToken = function(token,cb){
    var user = this ;
    jwt.verify(token,'thisissecret',async(err,decode_email)=>{
        try{
            let userDoc = await user.findOne({'email':decode_email});
            cb(null,userDoc);
        }
        catch(error){
            if(error) return cb(error);
        }
    })
}



const Userauth = mongoose.model('Userauth', userSchema);
module.exports = { Userauth };