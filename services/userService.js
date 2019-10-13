require("dotenv").config();
const User = require(`../models/${process.env.DB}-user`);
const auth = require("../utils/auth");

const getAll = async () => await User.find();

// Sign Up
const create = async user => {
  user.temporal_token = await auth.createToken(user);
  return await User.create(user);
};

// recommended option to use middlewares "hooks" (pre, post ...)
const update = async (id, user) => {
  const findedUser = await User.findById(id);
  Object.assign(findedUser, user); // to clone objects
  return await findedUser.save();
};

// this option execute command directly in the database => https://github.com/Automattic/mongoose/issues/964
// TO AVOID => https://twm.me/correct-way-to-use-mongoose/
// const update = async (id, user) =>
//   await User.findByIdAndUpdate(id, { $set: user }).exec();

const remove = async id => await User.findByIdAndDelete(id);

const getById = async id => await User.findById(id);

const getByUserName = async username => await User.findOne({ username });

const getByEmail = async email => await User.findOne({ email });

const login = async user => {
  const findedUser = await User.findOne({ email: user.email }).select(
    "password"
  ); // to retrieve password field, because schema select option is set to false
  const isValidLogin = await findedUser.comparePassword(user.password);
  if (isValidLogin) {
    findedUser.temporal_token = await auth.createToken(user);
    await findedUser.save();
    return { token: findedUser.temporal_token };
  }
  throw new Error("Invalide Token");
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  getById,
  getByUserName,
  getByEmail,
  login
};
