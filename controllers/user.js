const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const getSingleUser = asyncErrorWrapper(async (req, res, next) => {

    // const user = await User.findById(id);  //databaseErrorHelpers middlewaredan geliyor. req.data=user.

    return res.status(200)
    .json({
        success: true,
        data: req.data //user -- bu kullanılmadı //databaseErrorHelperstan geldi.req.data=user
    });

});

const getAllUsers = asyncErrorWrapper(async (req, res, next) => {

    return res.status(200)
    .json(res.queryResults);

});


module.exports = {
    getSingleUser,
    getAllUsers
}