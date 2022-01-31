const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 5;
      },
      message: props => `${props.value} is not too short!`
    }
  },
  body: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 5;
      },
      message: props => `${props.value} is not too short!`
    }
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer',
  }],
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  favoriteAnswer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }
}, {
  timestamps: true
}
);

questionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
});

const Question = model('Question', questionSchema);

module.exports = Question;