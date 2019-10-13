const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new Schema({
  first_name: String,
  last_name: String,
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  created_date: {
    type: Date,
    default: Date.now()
  },
  updated_date: {
    type: Date,
    default: Date.now()
  },
  temporal_token: String,
  reset_token: String,
  permission: {
    type: [String],
    enum: ["create", "read", "update", "delete"],
    default: ["read"]
  }
});

// Option (1) aync/await for don't calling next() manually
// NOTE:
//    Do not declare methods using ES6 arrow functions (=>).
//    Arrow functions explicitly prevent binding "this", so the method will not have access to the document
UserSchema.pre(["save"], async function() {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

UserSchema.methods.comparePassword = async function(password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

// Option (2) without async/await then calling next() manually

// UserSchema.pre(["save"], function(next) {
//   let user = this;
//   if (!user.isModified("password")) {
//     return next();
//   }
//   bcrypt.hash(user.password, saltRounds).then(hashedPassword => {
//     user.password = hashedPassword;
//     next();
//   });
// });

// UserSchema.methods.comparePassword = (newPassword, next) => {
//   let user = this;
//   bcrypt.compare(newPassword, user.password, (err, isMatch) => {
//     if (err) return next(err);
//     next(null, isMatch);
//   });
// };

const User = mongoose.model("users", UserSchema);

module.exports = User;
