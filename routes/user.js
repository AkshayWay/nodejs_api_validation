const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const SchemaValidation = require("../SchemaValidation");

router.get("/getUser", controller.getUser);
router.post("/user", SchemaValidation.apiValidation, controller.postUser);
router.post("/newUser", controller.postUser);
router.put("/editUser/:id", controller.editUser);

module.exports = router;
