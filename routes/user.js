const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const SchemaValidation = require("../SchemaValidation");

router.post("/user", SchemaValidation.apiValidation, controller.postUser);
router.get("/getUser", controller.getUser);
router.post("/newUser", controller.postUser);
router.put("/editUser/:id", controller.editUser);
router.delete("/deleteUser/:id", controller.deleteUser);

module.exports = router;
