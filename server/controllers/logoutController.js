const mongoose = require('mongoose');
const users = require('../models/userModel.js');

const handleLogout = async (req,res,next) => {
    //on client side, delete the access token

    const  cookies  = req.cookies;
    if (!cookies?.jwt) {
        return res.status(204).json({
            message: 'No cookie found to log out with',
            status: 204
        });
    }
    const refreshToken = cookies.jwt;
    //is refreshToken in the db?
    const foundUser =  await users.findOne({ RefreshToken: refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly: true});
        return res.status(204).json({
            message: 'No user found with that refresh token',
            status: 204
        });
    }

    //delete the refresh token from the db
    foundUser.RefreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
    return res.status(204).json({
        message: 'Successfully logged out',
        status: 204
    });
}

module.exports = {  handleLogout };