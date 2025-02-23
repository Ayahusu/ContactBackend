
const loginUser = (req,res)=>{
    res.status(200).json({message: "Login Sucessfull", user: req.user});
}
module.exports = {loginUser}