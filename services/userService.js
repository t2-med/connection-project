// require('dotenv').config({path: path.join(__dirname,`.env.${process.env.NODE_ENV}`)});
// const User = require(`../models/${process.env.DB}-user`);

const User = require(`../models/mongodb-user`);
const auth = require('../utils/auth');
const ObjectId = require('mongoose').Types.ObjectId;

const getAll = async () => await User.find();

// Sign Up
const create = async user => {
  user.temporal_token = await auth.createToken(user);
  return await User.create(user);
};

const createSome = async users => {
  const res = [];
  for(const user of users) {
    res.push(await create(user));
  };
  return res;
};

// recommended option to use middlewares 'hooks' (pre, post ...)
const update = async (criteria, user) => {
  const id = ObjectId.isValid(criteria) ? criteria : null;
  const findedUser = await User.findOne({
    $or: [{ _id: id }, { username: criteria }, { email: criteria }]
  }).exec();
  Object.assign(findedUser, user); // to clone objects
  return await findedUser.save();
};

const remove = async criteria => {
  const id = ObjectId.isValid(criteria) ? criteria : null;
  const findedUser = await User.findOne({
    $or: [{ _id: id }, { username: criteria }, { email: criteria }]
  }).exec();
  return await findedUser.remove();
};

// this option execute command directly in the database => https://github.com/Automattic/mongoose/issues/964
// TO AVOID => https://twm.me/correct-way-to-use-mongoose/
// const update = async (id, user) =>
//   await User.findByIdAndUpdate(id, { $set: user }).exec();

// const remove = async id => await User.findByIdAndDelete(id);

const getById = async id => await User.findById(id);

const getByUserName = async username => await User.findOne({ username });

const getByEmail = async email => await User.findOne({ email });

const login = async user => {
  const findedUser = await User.findOne({ email: user.email }) 
  || await User.findOne({ username: user.username })
  .select('password'); // to retrieve password field, because schema select option is set to false
  const isValidLogin = await findedUser.comparePassword(user.password);
  if (isValidLogin) {
    findedUser.temporal_token = await auth.createToken(user);
    await findedUser.save();
    return { token: findedUser.temporal_token };
  }
  throw new Error('Invalide Token');
};

module.exports = {
  getAll,
  create,
  createSome,
  update,
  remove,
  getById,
  getByUserName,
  getByEmail,
  login
};
