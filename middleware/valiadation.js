const User = require("../model/userModel")
const userLoginValidation =async (req,res,next)=>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User doesn't exist"});
        }

        const isMatch = await User.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({message: "Invalid Password"})
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({message:"Invalid Email or password", error: error.message})
    }
}

module.exports = {userLoginValidation}