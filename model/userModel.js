const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    try {
        const salt = bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User", userSchema)