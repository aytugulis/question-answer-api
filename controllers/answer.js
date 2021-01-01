const Question = require('../models/Question');
const Answer = require('../models/Answer');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const addNewAnswerToQuestion = asyncErrorWrapper(async (req, res, next) => {
    
    const { question_id } = req.params;

    const user_id = req.user.id;

    const information = req.body;

    const answer = await Answer.create({
        ...information,
        question: question_id,
        user: user_id
    });

    return res.status(200)
    .json({
        success: true,
        data: answer
    });

});

const getAllAnswersByQuestion = asyncErrorWrapper(async (req, res, next) => {
    
    const { question_id } = req.params;

    const question = await Question.findById(question_id).populate('answers'); //populate answer ile question içindeki answerın sadece idsini değil diğer bilgilerinide almamıza yarar.

    const answers = question.answers;

    return res.status(200)
    .json({
        success: true,
        count: answers.length,
        data: answers
    });

});

const getSingleAnswer = asyncErrorWrapper(async (req, res, next) => {
    
    //req.data=answer //databaseErrorHelpersta
    req.data
    .populate({
        path: 'question',
        select: 'title'
    })//populateden gelen fazla bilgilerden select ile istenilen bilgiler alınarak sadeleştirilebilir.
    .populate({
        path: 'user',
        select: 'name profile_image'
    });

    return res.status(200)
    .json({
        success: true,
        data: req.data
    });

});

const editAnswer = asyncErrorWrapper(async (req, res, next) => {
    
    const { content } = req.body;

    //req.data=answer databaseErrorHelperstan geliyor.
    req.data.content = content;

    await req.data.save();

    return res.status(200)
    .json({
        success: true,
        data: req.data
    });

});

const deleteAnswer = asyncErrorWrapper(async (req, res, next) => {
    
    const { answer_id } = req.params;
    const { question_id } = req.params;

    await Answer.findByIdAndRemove(answer_id);

    const question = await Question.findById(question_id);

    question.answers.splice(question.answers.indexOf(answer_id), 1);
    question.answerCount = question.answers.length;
    
    

    await question.save();

    return res.status(200)
    .json({
        success: true,
        message: 'Answer deleted succesful'
    });

});

const likeAnswer =  asyncErrorWrapper(async (req, res, next) => {

    //req.data
   
    if(req.data.likes.includes(req.user.id)){
        return next (new CustomError('You have already liked this answer',400));
    }

    req.data.likes.push(req.user.id);

    await req.data.save();

    res.status(200)
    .json({
        success: true,
        data: req.data
    });

});

const undoLikeAnswer =  asyncErrorWrapper(async (req, res, next) => {

    //req.data
   
    if(!req.data.likes.includes(req.user.id)){
        return next (new CustomError('You can not undo like operation this answer',400));
    }

    const index = req.data.likes.indexOf(req.user.id);

    req.data.likes.splice(index, 1);

    await req.data.save();

    res.status(200)
    .json({
        success: true,
        data: req.data
    });

});










module.exports = {
    addNewAnswerToQuestion,
    getAllAnswersByQuestion,
    getSingleAnswer,
    editAnswer,
    deleteAnswer,
    likeAnswer,
    undoLikeAnswer
}