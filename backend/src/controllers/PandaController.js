const models = require("../models");
const calculateMatch = require("../services/calculateMatch");

class PandaController {
  static browse = (req, res) => {
    if (req.query.gender) {
      models.panda
        .findByGender(req.query.gender)
        .then(([rows]) => {
          res.send(rows);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    } else {
      models.panda
        .findAll()
        .then(([rows]) => {
          res.send(rows);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    }
  };

  static read = (req, res) => {
    models.panda
      .findPandaInfos(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static findpartners = (req, res) => {
    models.panda
      .findPartnersById(req.params.id)
      .then(([rows]) => {
        const result = calculateMatch(rows, req.params.id);
        res.send(result);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static edit = (req, res) => {
    const panda = req.body;
    panda.id = parseInt(req.params.id, 10);

    models.panda
      .update(panda)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static add = (req, res) => {
    const panda = req.body;

    // TODO validations (length, format...)

    models.panda
      .insert(panda)
      .then(([result]) => {
        panda.id = result.insertId;
        models.panda.insertAscendance(panda).then(() => {
          res.status(201).send({ ...panda, id: result.insertId });
        });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.panda
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = PandaController;
