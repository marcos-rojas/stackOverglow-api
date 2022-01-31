const Question = require('../models/Question');
const User = require('../models/User');

module.exports.getQuestions = async (req, res) => {
    let questions;
    if(req.query.title){
        let queryWord = new RegExp(req.query.title, 'i')
        questions = await Question.find({ "title" : { $regex: queryWord} }).populate('writer','username').populate('favoriteAnswer').sort([['createdAt', -1]]);
    }else{
        questions = await Question.find().populate('writer','username').sort([['createdAt', -1]]);
    }
    res.json(questions);
};

module.exports.saveQuestion = async (req, res) => {
    const {title, body} = req.body;
    const newQuestion = new Question({title, body});
    const writer = await User.findById(req.userId);
    newQuestion.writer = writer._id;
    const savedQuestion = await newQuestion.save();
    
    res.status(201).json(savedQuestion);
};

module.exports.getQuestionById = async (req, res) => {
    const { id } = req.params
    const question = await Question.findById(id).populate('answers').populate('favoriteAnswer','body').populate('writer','username');
    if (question) return res.json(question);
    res.status(404).end();
};

module.exports.updateQuestion = async (req, res) => {
    const { id } = req.params;
    const question = await Question.findByIdAndUpdate(id, {
        ...req.body
    });
    const questionUpdated = await question.save();
    res.json(questionUpdated);
};

module.exports.deleteQuestion = async (req, res) => {
    const { id } = req.params
    const questionDeleted = await Question.findByIdAndDelete(id)
    if (res === null) return res.sendStatus(404)
    res.status(204).end()
};