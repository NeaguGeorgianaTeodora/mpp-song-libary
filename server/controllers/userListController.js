const mongoose = require('mongoose');
const users = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req,res,next) => {
    const { Username, Password } = req.body;
    if (!Username || !Password) {
        return res.status(400).json({
            message: 'Username and Password are required'
        });
    }
    // Check if the user already exists
    const duplicateUser = await users.findOne({ Username }).exec();
    if (duplicateUser) {
        return res.status(409).json({
            message: 'Username already exists'
        });
    }

    try{
        //rncrypt password
        const hashedPassword = await bcrypt.hash(Password, 10); // 10 is the salt. See https://www.npmjs.com/package/bcrypt#to-hash-a-password
        // Create a new user
        const newUser = new users({ 
            Username: Username, 
            Password: hashedPassword 
        });
        const result = await newUser.save();
        console.log(result);

        return res.status(201).json({
            message: `new user ${Username} created!`
        });
    }catch(err){
        return res.status(500).json({
            error: err 
        });
    }
}

const loginUser = async (req,res,next) => {
    const { Username, Password } = req.body;
    if (!Username || !Password) {
        return res.status(400).json({
            message: 'Username and Password are required'
        });
    }
    const foundUser = await users.findOne({ Username }).exec();

    if (!foundUser) {
        return res.status(401).json({
            message: 'Username or Password is incorrect'
        });
    }

    //evaluate password
    const validPassword = await bcrypt.compare(Password, foundUser.Password);
    if(validPassword){
        //create JWTs
        const accessToken = jwt.sign(
            { username: foundUser.Username},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s'} //in production, use a longer expiration time (e.g. 5m)
        );
        const refreshToken = jwt.sign(
            { username: foundUser.Username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d'} 
        );

        foundUser.RefreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true, //might not be able to test this locally
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).json({
            message: 'Login successful',
            accessToken
        });
    }else {
        return res.status(401).json({
            message: 'Username or Password is incorrect'
        });
    }
}

module.exports = {
    createUser,
    loginUser
}