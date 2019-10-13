const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// GET
router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.get("/username/:username", userController.getByUserName);
router.get("/email/:email", userController.getByEmail);

// POST
router.post("/", userController.create);

// PUT
router.put("/:id", userController.update);

// DELETE
router.delete("/:id", userController.remove);

// PATCH
router.patch('/:id', userController.update)


router.post("/login", userController.login);

module.exports = router;
