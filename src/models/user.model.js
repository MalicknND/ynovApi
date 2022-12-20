const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

//validation sur
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    this.password = hashedPassword;
    next();
  });
});

module.exports = mongoose.model('user', userSchema);
