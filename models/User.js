const { Schema, model } = require('mongoose');

// Schema to create a user model
const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(v) {
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
          },
            message:'You must enter a valid email.'
        }
      },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'thought',
        },
      ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// Create a virtual property `friendCount`
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  
const User = model('user', userSchema);

module.exports = User;