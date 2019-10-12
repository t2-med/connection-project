const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const User = mongoose.model("users", UserSchema);

module.exports = User;
