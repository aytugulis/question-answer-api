const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');


const blockUser = asyncErrorWrapper(async (req, res, next) => {

    const user = req.data; //databaseErrorHelpers --req.data--

    user.blocked = !user.blocked;

    await user.save();

    return res.status(200)
    .json({
        success: true,
        message: 'Block - Unblock succesful'
    })

});


const deleteUser = asyncErrorWrapper(async (req, res, next) => {

    const user = req.data; //databaseErrorHelpers --req.data--

    await user.remove();

    return res.status(200)
    .json({
        success: true,
        message: 'Delete operation succesful'
    })

});




module.exports = {
    blockUser,
    deleteUser
}