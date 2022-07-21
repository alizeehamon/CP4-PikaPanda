const AbstractManager = require("./AbstractManager");

class PandaManager extends AbstractManager {
  static table = "panda";

  findByGender(gender) {
    return this.connection.query(
      `select * from  ${this.table} where gender = '${gender}'`
    );
  }

  findPandaInfos(id) {
    return this.connection.query(
      `select panda.id, panda.name AS name, birth_date, panda.id_zoo, zoo.name AS zoo, zoo.city AS city, description, gender, image, available, id_father, id_mother from  ${this.table} LEFT JOIN ascendance ON id_child = panda.id JOIN zoo ON zoo.id = id_zoo where panda.id = ?`,
      [id]
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
      `update ${PandaManager.table} set name = ?, gender = ?, id_zoo = ?, description = ?, image = ?, available = ? where id = ?`,
      [
        panda.name,
        panda.gender,
        parseInt(panda.idZoo, 10),
        panda.description,
        panda.image,
        parseInt(panda.available, 10),
        panda.idPanda,
      ]
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

  findPartnersById(id) {
    return this.connection.query(
      `select panda.id, panda.name AS name, birth_date, panda.id_zoo, zoo.name AS zoo, zoo.city AS city, description, gender, image, available, id_mother, id_father from  ${this.table} JOIN zoo ON zoo.id = id_zoo LEFT JOIN ascendance on ascendance.id_child = panda.id where panda.id = ${id} OR panda.gender != (select gender from ${this.table} where id = ?)`,
      [id]
    );
  }
}

module.exports = PandaManager;
