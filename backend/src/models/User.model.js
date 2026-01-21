const monggose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new monggose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true, 
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:["user","agent","admin"],
        default:"user"
    },
    isVerified:{
        type: Boolean,
        default: false
    }
}, {timestamps: true});

//Hash password before saving - to be implemented
userSchema.pre('save', async function(){
   if(!this.isModified('password')){
       return;
   }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword  = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = monggose.model("User", userSchema);

