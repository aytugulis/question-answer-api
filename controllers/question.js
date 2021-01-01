const Question = require('../models/Question');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const getAllQuestions =  asyncErrorWrapper(async (req, res, next) => {

    return res
    .status(200)
    .json(res.queryResults);

});

const askNewQuestion =  asyncErrorWrapper(async (req, res, next) => {

    const information = req.body;

    const question = await Question.create({
        ...information,
        user: req.user.id
    });

    res
    .status(200)
    .json({
        success: true,
        data: question
    });

});

const getSingleQuestion =  asyncErrorWrapper(async (req, res, next) => {

    // req.data=question ===>>> databaseErrorHelpersta alttaki iki işle yapıldı.
    // const { id } = req.params;
    // const question = await Question.findById(id);

    return res
    .status(200)
    .json(res.queryResults);
    // .json
    // ({
    //     success: true,
    //     data: req.data
    // });

});

const editQuestion =  asyncErrorWrapper(async (req, res, next) => {

    // req.data=question ===>>> databaseErrorHelpersta alttaki iki işle yapıldı.
    // const { id } = req.params;
    // const question = await Question.findById(id);

    const { title, content } = req.body;


    req.data.title = title;
    req.data.content = content;


    req.data = await req.data.save();

    return res
    .status(200)
    .json({
        success: true,
        data: req.data
    });

});

const deleteQuestion =  asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;

    await Question.findByIdAndDelete(id);
   

    res.status(200)
    .json({
        success: true,
        message: 'Question delete operation succesful'
    });

});

const likeQuestion =  asyncErrorWrapper(async (req, res, next) => {

    //req.data
   
    if(req.data.likes.includes(req.user.id)){
        return next (new CustomError('You have already liked this question',400));
    }

    req.data.likes.push(req.user.id);
    question.likeCount = question.likes.length;

    await req.data.save();

    res.status(200)
    .json({
        success: true,
        data: req.data
    });

});

const undoLikeQuestion =  asyncErrorWrapper(async (req, res, next) => {

    //req.data
   
    if(!req.data.likes.includes(req.user.id)){
        return next (new CustomError('You can not undo like operation this question',400));
    }

    const index = req.data.likes.indexOf(req.user.id);

    req.data.likes.splice(index, 1);
    question.likeCount = question.likes.length;

    await req.data.save();

    res.status(200)
    .json({
        success: true,
        data: req.data
    });

});



module.exports = {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    undoLikeQuestion
}