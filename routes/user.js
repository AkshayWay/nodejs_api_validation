const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const SchemaValidation = require("../SchemaValidation");

router.get("/user", controller.getUser);
router.post("/user", SchemaValidation.apiValidation, controller.postUser);

module.exports = router;
