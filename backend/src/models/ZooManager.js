const AbstractManager = require("./AbstractManager");

class ZooManager extends AbstractManager {
  static table = "zoo";
}

module.exports = ZooManager;
