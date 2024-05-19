const mongoose = require('mongoose');
const users = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req,res,next) => {
    const  cookies  = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const foundUser =  await users.findOne({ RefreshToken: refreshToken }).exec();

    if (!foundUser) {
        return res.sendStatus(403).json({
            message: 'Forbidden: No user found with that refresh token'
        });
    }

    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded) => {
            if (err || foundUser.Username !== decoded.username) {
                return res.sendStatus(403).json({
                    message: 'Forbidden'
                });
            }
            const accessToken = jwt.sign(
                { username: decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' } //set this for a bit longer in production
            );
            res.json({ accessToken: accessToken });
        }
    );
}

module.exports = {  handleRefreshToken };