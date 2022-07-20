const models = require("../models");

class ZooController {
  static browse = (req, res) => {
    models.zoo
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = ZooController;
