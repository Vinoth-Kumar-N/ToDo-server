const User = require('../models/Users.js')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret_key = process.env.JWT_SECRET;


async function registerUser(req, res){
    try{
        let { username, email, password } = req.body;
        const dup = await User.find({email});
        if(dup && dup.length > 0) return res.status(400).send({ message: "User already exists" });
        let user = new User({username, email, password});
        let result = await user.save();
        console.log(result);
        res.status(201).send({ message: "User created successfully" });
       
    }catch(e){
        console.log(e);
        res.status(400).send({ message: e.message });
    }
}

async function showUsers(req, res){
    try {
        const users = await User.find();
        if(users.length === 0) return res.status(400).json({message: "No users Found"});
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

async function loginUser(req, res){
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).send({ message: "Authentication failed" });
        let isMatch = await user.comparePassword(password);
        if(!isMatch){
            res.status(400).send({ message: "Wrong Password" });
        }
        let token = jwt.sign({id: user._id}, secret_key, {expiresIn: '1h'});
        let finalData = {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }
        res.status(201).send(finalData);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message });
    }
}



const AuthController = {
    registerUser,
    loginUser,
    showUsers
}

module.exports = AuthController;