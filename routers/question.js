const express = require('express');
const Question = require('../models/Question');
const answer = require('./answer');
const { askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion, undoLikeQuestion } = require('../controllers/question');
const { checkQuestionExist } = require('../middlewares/database/databaseErrorHelpers');
const { getAccessToRoute, getQuestionOwnerAccess } = require('../middlewares/authorization/auth');
const questionQueryMiddleware = require('../middlewares/query/questionQueryMiddleware');
const answerQueryMiddleware = require('../middlewares/query/answerQueryMiddleware');

// api/questions
const router = express.Router();


router.get('/:id/like',  [getAccessToRoute, checkQuestionExist], likeQuestion );
router.get('/:id/undo_like',  [getAccessToRoute, checkQuestionExist], undoLikeQuestion );

router.get('/', questionQueryMiddleware(
    Question,
    {
        population: {
            path: 'user',
            select: 'name profile_image'
        }
    }
), getAllQuestions);

router.get('/:id', checkQuestionExist, answerQueryMiddleware(Question,{
    population: [
        {
            path: 'user',
            select: 'name profile_image'
        },
        {
            path: 'answers',
            select: 'content'
        }
    ]
}), getSingleQuestion);
router.post('/ask', getAccessToRoute, askNewQuestion);
router.put('/:id/edit', [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], editQuestion);
router.delete('/:id/delete', [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], deleteQuestion);

// question-answer
router.use('/:question_id/answers', checkQuestionExist, answer);

module.exports = router;