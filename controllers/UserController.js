const User = require("../models/User");


const GetAllUser = async (req, res)=>{
    try {
        const getusers = await User.find();
        res.status(200).json(getusers);
    } catch (err) {
        res.status(400).json({message: `Error retrieving all users : ${err}`});
    }
} 


const UpdateUser = async (req, res)=>{
    try {
        const updateuser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, { new : true});
        res.status(200).json(updateuser);
    } catch (err) {
        res.status(401).json({message: `Error updating the user : ${err}`})
    }
}


const DeleteUser = async (req, res)=>{
    try {
      const deleteuser = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User has been deleted" });
    } catch (err) {
      res.status(400).json({ message: `Error deleting the user! : ${err}` });
    }
}




module.exports = { GetAllUser, DeleteUser, UpdateUser }; 