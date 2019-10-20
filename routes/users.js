const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// GET
router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.get("/username/:username", userController.getByUserName);
router.get("/email/:email", userController.getByEmail);

// PUT
router.put("/:id", userController.update);
router.put("/username/:username", userController.update);
router.put("/email/:email", userController.update);

// DELETE
router.delete("/:id", userController.remove);
router.delete("/username/:username", userController.remove);
router.delete("/email/:email", userController.remove);

// PATCH
router.patch('/:id', userController.update);
router.patch('/:username', userController.update);
router.patch('/:email', userController.update);

// POST
router.post("/", userController.create);
router.post("/some", userController.createSome);


router.post("/login", userController.login);

module.exports = router;
