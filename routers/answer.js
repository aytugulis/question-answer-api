const express = require('express');
const { getAccessToRoute } = require('../middlewares/authorization/auth');
const { addNewAnswerToQuestion, getAllAnswersByQuestion, getSingleAnswer, editAnswer, deleteAnswer, likeAnswer, undoLikeAnswer } = require('../controllers/answer');
const { checkQuestionAndAnswerExist } = require('../middlewares/database/databaseErrorHelpers');
const { getAnswerOwnerAccess } = require('../middlewares/authorization/auth');

const router = express.Router({mergeParams:true}); //geldiği routedaki paramsı aktarır.

///:question_id/answers

router.post('/', getAccessToRoute, addNewAnswerToQuestion);
router.get('/', getAllAnswersByQuestion)
router.get('/:answer_id', checkQuestionAndAnswerExist, getSingleAnswer)
router.get('/:answer_id/like', [ checkQuestionAndAnswerExist, getAccessToRoute ], likeAnswer)
router.get('/:answer_id/undo_like', [ checkQuestionAndAnswerExist, getAccessToRoute ], undoLikeAnswer)
router.put('/:answer_id/edit', [ checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess ], editAnswer)
router.delete('/:answer_id/delete', [ checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess ], deleteAnswer)

module.exports = router;