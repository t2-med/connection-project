const userService = require("../services/userService");
require("dotenv").config();
const User = require(`../models/${process.env.DB}-user`);

const getAll = (req, res) => {
  userService
    .getAll()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json(err));
};

const getById = (req, res) => {
  userService
    .getById(req.params.id)
    .then(user =>
      user ? res.status(200).json(user) : res.status(404).json(user)
    )
    .catch(err => res.status(500).json(err));
};

const getByUserName = (req, res) => {
  userService
    .getByUserName(req.params.username)
    .then(user =>
      user ? res.status(200).json(user) : res.status(404).json(user)
    )
    .catch(err => res.status(500).json(err));
};

const getByEmail = (req, res) => {
  userService
    .getByEmail(req.params.email)
    .then(user =>
      user ? res.status(200).json(user) : res.status(404).json(user)
    )
    .catch(err => res.status(500).json(err));
};

const create = (req, res) => {
  userService
    .create(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err.message));
};

const update = (req, res) => {
  userService
    .update(req.params.id, req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err));
};

const remove = (req, res) => {
  userService
    .remove(req.params.id)
    .then(() => res.status(200).json("Deleted"))
    .catch(err => res.status(500).json(err));
};

const login = (req, res) => {
  userService
    .login(req.body)
    .then(match => res.status(200).json(match))
    .catch(err => res.status(500).json(err));
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
