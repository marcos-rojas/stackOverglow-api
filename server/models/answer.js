const { Schema, model } = require('mongoose');

const answerSchema = new Schema({
  body: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 5;
      },
      message: props => `${props.value} is not too short!`
    }
  },
  rating: {
    type: Number,
    default: 0
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

answerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
});

const Answer = model('Answer', answerSchema);

module.exports = Answer;
