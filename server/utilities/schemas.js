const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');
const extension = (joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
       "string.htmlStrip": "{{#label}} not contain any html tags"
    },
    rules: {
    scapeHTML: {
     validate(value, helpers) {
       const clean = sanitizeHtml(value, {
         allowedTags: [],
         allowedAttributes: {},
       });
       if (clean == value) {
         return clean;
       }
       return helpers.error("string.scapeHTML", {value})
     }
   } } } ) 

const Joi = BaseJoi.extend(extension);

const questionSchema = Joi.object({
    question: Joi.object({
        title: Joi.string().required().scapeHTML(),
        body: Joi.string().required().scapeHTML(),
        
    }).required()
});

const answerSchema = Joi.object({
    answer: Joi.object({
        body: Joi.string().required().scapeHTML(),
        rating: Joi.number().required().min(1).max(5)
    }).required()
})

module.exports.questionSchema = questionSchema;
module.exports.answerSchema = answerSchema;