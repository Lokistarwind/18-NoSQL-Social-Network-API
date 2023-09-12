const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

function formatDate(date){
  const months = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November',
    'December'
  ];
  let newDate = months[date.getMonth()] +" " +date.getDate() +",  " 
  + date.getFullYear() + " at " + date.getHours() + ":" + date.getMinutes();
  return newDate;
}

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
          },
          //username who made the thought
          username: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            get: (date) => formatDate(date),
            default: Date.now,
          },
        reactions: [reactionSchema],
      },
      {
        toJSON: {
          getters: true,
        },
      }

);
// Create a virtual property `friendCount`
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
