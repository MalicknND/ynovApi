const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: 'String',
      required: true,
      lowercase: true,
      maxLength: 50,
      minLength: 2,
    },
    lastName: {
      type: 'String',
      required: true,
      lowercase: true,
      maxLength: 50,
      minLength: 2,
    },
    email: {
      type: 'String',
      required: true,
      lowercase: true,
      unique: true,
      maxLength: 50,
      minLength: 2,
    },
    isAdmin: {
      type: 'Boolean',
      required: true,
      default: true,
    },
    password: {
      type: 'String',
      required: true,
      maxLength: 250,
      minLength: 2,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user', userSchema);
