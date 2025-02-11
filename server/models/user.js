const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');






const userSchema = new mongoose.Schema(
  {
    data:{
      auth:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true,
        unique: true,
      },
      following: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          unique: true,
        },
      ],
      bookmarkedPosts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post',
        },
      ],
      avatarExists: {
        type: Boolean,
        default: 'false',
      },
      avatarError: {
        type: Boolean,
        default: 'false',
      },
    }, 
    avatar: {
      username: {
        type: String,
        minlength: 3,
        maxlength: 20,
        trim: true,
        sparse: true,
        unique: true,
        // default: null,
      },
      imageLink: {
        type: String,
        trim: true,
        default: 'null',
      },
      description:{
        type: String,
        trim: true,
        default: 'null',
      },
      phone:{
        type: String,
        trim: true,
        default: 'null',
      },
      Followers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          unique: true,
        },
      ],
      posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post',
        },
      ],
      avatarSetDate: {
        type: Date,
      }
    },
    
    
  },
  {
    timestamps: true,
    versionKey: false
  },
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
