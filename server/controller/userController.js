const User = require( "../model/userModel.js");

const createUser=async(req,res)=>{
    try{
        const user=new User(req.body);
        const {email}=user;
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:"User with this email already exists"});
        }
        const savedUser=await user.save();
        res.status(200).json({message:"User created successfully."});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports={createUser};

const getUsers=async(req,res)=>{
    try{
        const users=await User.find({});
        if(!users||users.length===0){
            return res.status(404).json({message:"No users found"});
        }
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message:error.message});
    }};

module.exports={createUser,getUsers};

const getUserbyId=async(req,res)=>{
    try{
        const {id}=req.params;
        const userExist=await User.findById(id);
        if(!userExist){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(userExist);
    }catch(error){
        res.status(500).json({message:error.message});
    } };

module.exports={createUser,getUsers,getUserbyId};  

const update=async(req,res)=>{
    try{
        const {id}=req.params;
        const userExist=await User.findById(id);
        if(!userExist){
            return res.status(404).json({message:"User not found"});
        }       
        const updatedUser=await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({message:"User updated successfully."});
    }catch(error){
        res.status(500).json({message:error.message});
    }   
};

module.exports={createUser,getUsers,getUserbyId,update};

const deleteUser=async(req,res)=>{
    try{
        const {id}=req.params;  
        const userExist=await User.findById(id);
        if(!userExist){
            return res.status(404).json({message:"User not found"});
        }   
        await User.findByIdAndDelete(id);
        res.status(200).json({message:"User deleted successfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports={createUser,getUsers,getUserbyId,update,deleteUser};