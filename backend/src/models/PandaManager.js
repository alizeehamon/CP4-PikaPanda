const AbstractManager = require("./AbstractManager");

class PandaManager extends AbstractManager {
  static table = "panda";

  findByGender(gender) {
    return this.connection.query(
      `select * from  ${this.table} where gender = '${gender}'`
    );
  }

  insert(panda) {
    return this.connection.query(
      `insert into ${PandaManager.table} (name, birth_date, gender, id_zoo, description, image) values (?, ?, ?, ?, ?, ?)`,
      [
        panda.name,
        panda.birthdate,
        panda.gender,
        panda.zoo,
        panda.description,
        panda.image,
      ]
    );
  }

  update(panda) {
    return this.connection.query(
      `update ${PandaManager.table} set title = ? where id = ?`,
      [panda.title, panda.id]
    );
  }

  insertAscendance(panda) {
    if (panda.mother && panda.father) {
      return this.connection.query(
        `insert into ascendance (id_child, id_mother, id_father) values (?, ?, ?)`,
        [panda.id, panda.mother, panda.father]
      );
    }
    if (panda.mother) {
      return this.connection.query(
        `insert into ascendance (id_child, id_mother) values (?, ?)`,
        [panda.id, panda.mother]
      );
    }
    if (panda.father) {
      return this.connection.query(
        `insert into ascendance (id_child, id_father) values (?, ?)`,
        [panda.id, panda.father]
      );
    }
    return this.connection.query(
      `insert into ascendance (id_child) values (?)`,
      [panda.id]
    );
  }
}

module.exports = PandaManager;