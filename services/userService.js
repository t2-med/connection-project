const User = require("../models/user");

const getAll = async () => await User.find();

const create = async user => await User.create(user);

const update = async (id, user) =>
  await User.findByIdAndUpdate(id, { $set: user });

const remove = async id => await User.findByIdAndDelete(id);

const getById = async id => await User.findById(id);

const getByUserName = async username => await User.findOne({ username });

const getByEmail = async email => await User.findOne({ email });

module.exports = {
  getAll,
  create,
  update,
  remove,
  getById,
  getByUserName,
  getByEmail
};
