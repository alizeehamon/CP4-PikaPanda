const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

class UserController {
  static register = async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
      res.status(400).send({ error: "Please specify both email and password" });
      return;
    }

    try {
      const hash = await argon2.hash(password);

      models.user
        .insert({ email, password: hash, role })
        .then(([result]) => {
          res.status(201).send({ id: result.insertId, email, role });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({
            error: err.message,
          });
        });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        error: err.message,
      });
    }
  };

  static login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .send({ error: "Vous devez indiquer un mail et un mot de passe" });
    }

    models.user
      .findByMail(email)
      .then(async ([rows]) => {
        if (rows[0] == null) {
          res.status(403).send({
            error: "Cet utilisateur est introuvable",
          });
        } else {
          // eslint-disable-next-line no-shadow
          const { id, email, password: hash, role } = rows[0];

          if (await argon2.verify(hash, password)) {
            const token = jwt.sign(
              { id, email, role },
              `${process.env.JWT_AUTH_SECRET}`,
              {
                expiresIn: 60 * 60 * 24 * 15,
              }
            );
            res.cookie("access_token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
            });
            res.status(200).send({
              id,
              email,
              role,
              token,
            });
          } else {
            res.status(403).send({
              error: "Mot de passe invalide",
            });
          }
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          error: err.message,
        });
      });
  };

  static logout = (req, res) => {
    return res.clearCookie("access_token").sendStatus(200);
  };
}

module.exports = UserController;
