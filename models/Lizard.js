const pool = require('../lib/utils/pool');

class Lizard {
  id;
  numberOfLizards;

  constructor(row){
    this.id = row.id;
    this.numberOfLizards = row.number_of_lizards;
  }

  static async insertLizard({ numberOfLizards }){
    const { rows } = await pool.query(`
    INSERT INTO lizards (number_of_lizards)
    VALUES ($1)
    RETURNING *`
    , [numberOfLizards]);

    return new Lizard(rows[0]);
  }

  static async getLizards(){
    const { rows } = await pool.query(`
    SELECT * FROM lizards`);
    return rows.map(lizard => new Lizard(lizard));
  }

  static async getLizardById(id){
    const { rows } = await pool.query(`
    SELECT * FROM lizards
    WHERE id = $1`
    , [id]);

    return new Lizard(rows[0]);
  }

  static async updateLizard(id, { numberOfLizards }){
    const { rows } = await pool.query(`
    UPDATE lizards
    SET number_of_lizards = $1
    WHERE id = $2
    RETURNING *`
    , [numberOfLizards, id]);

    return new Lizard(rows[0]);
  }

  static async deleteLizard(id){
    const { rows } = await pool.query(`
    DELETE FROM lizards
    WHERE id = $1
    RETURNING *`
    , [id]);

    return new Lizard(rows[0]);
  }
}

module.exports = Lizard;
