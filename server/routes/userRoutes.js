const express = require('express');

const { getUsers, createUser, getUserbyId ,update, deleteUser} = require( '../controller/userController.js');

const router = express.Router();
router.post("/user", createUser);
router.get("/users", getUsers);
router.get("/user/:id", getUserbyId);
router.put("/update/user/:id", update);
router.delete("/delete/user/:id", deleteUser);

module.exports= router;     