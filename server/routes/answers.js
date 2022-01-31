const express = require('express');
const router = express.Router({mergeParams: true});
const answerController = require('../controllers/answers');
const catchAsync = require('../utilities/catchAsync');
const auth = require('../middlewares/auth');
// const {validateAnswer} = require('../middlewares/validMiddlewares');

router.post('/answers', auth, catchAsync(answerController.saveAnswer));
router.post('/:idfav', auth, catchAsync(answerController.saveFav));

module.exports = router;