const express = require("express");

const {
  PandaController,
  ZooController,
  UserController,
} = require("./controllers");

const router = express.Router();

router.get("/pandas", PandaController.browse);
router.get("/pandas/:id", PandaController.read);
router.put("/pandas/:id", PandaController.edit);
router.post("/pandas", PandaController.add);
router.delete("/pandas/:id", PandaController.delete);

router.get("/zoos", ZooController.browse);

router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
