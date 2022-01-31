const { answerSchema, questionSchema } = require('../utilities/schemas')
const ExpressError = require('../utilities/ExpressError');

module.exports.validateAnswer= (req, res, next) =>{
    const {error} = answerSchema.validate(req.body.answer);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
};
module.exports.validateQuestion= (req, res, next) =>{
    const {error} = questionSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }else{
        next();
    }
};