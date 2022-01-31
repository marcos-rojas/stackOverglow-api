const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questions');
const catchAsync = require('../utilities/catchAsync');
const auth = require('../middlewares/auth');
// const {validateQuestion} = require('../middlewares/validMiddlewares');

router.get('/', catchAsync(questionController.getQuestions));
router.post('/', auth, catchAsync(questionController.saveQuestion));

router.get('/:id', catchAsync(questionController.getQuestionById));
// router.put('/:id', auth, validateQuestion, catchAsync(questionController.updateQuestion));
// router.delete('/:id', auth, catchAsync(questionController.deleteQuestion));

module.exports = router;