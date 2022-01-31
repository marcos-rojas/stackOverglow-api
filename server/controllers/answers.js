const Question = require('../models/Question');
const Answer = require('../models/answer');
const User = require('../models/User');

module.exports.saveAnswer = async (req, res) => {
    const question = await Question.findById(req.params.id);
    if(!question) res.status(404).end();
    const author = await User.findById(req.userId);
    
    
    const newAnswer = new Answer(req.body.answer);
    newAnswer.author = author._id;

    try {
        question.answers = question.answers.concat(newAnswer._id);
        const savedAnswer = await newAnswer.save();
        await question.save();
        res.json(savedAnswer);
      } catch (error) {
        next(error)
      }
};

module.exports.saveFav = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if(!question) res.status(404).end();
  const newFav = await Answer.findById(req.params.idfav);
  question.favoriteAnswer = newFav._id;
  
  try {
      await question.save();
      res.json(newFav);
    } catch (error) {
      next(error)
    }
};