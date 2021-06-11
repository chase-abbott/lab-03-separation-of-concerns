const pool = require('../lib/utils/pool');

class Frog {
  id;
  numberOfFrogs;

  constructor(row){
    this.id = row.id;
    this.numberOfFrogs = row.number_of_frogs;
  }

  static async insertFrog({ numberOfFrogs }){
    const { rows } = await pool.query(`
    INSERT INTO frogs (number_of_frogs) VALUES ($1) RETURNING *`
    , [numberOfFrogs]);

    return new Frog(rows[0]);
  }

  static async selectFrogs() {
    const { rows } = await pool.query(`
    SELECT * FROM frogs`);

    return rows.map(frog => new Frog(frog));
  }

  static async selectFrogById(id){
    const { rows } = await pool.query(`
    SELECT * FROM frogs 
    WHERE id = $1`
    , [id]);

    return new Frog(rows[0]);
  }

  static async updateFrog(id, { numberOfFrogs }){
    const { rows } = await pool.query(`
    UPDATE frogs
    SET number_of_frogs = $1
    WHERE id = $2
    RETURNING *`
    , [numberOfFrogs, id]);

    return new Frog(rows[0]);
  }

  static async deleteFrog(id){
    const { rows } = await pool.query(`
    DELETE FROM frogs
    WHERE id = $1
    RETURNING *`
    , [id]);

    return new Frog(rows[0]);
  }
}


module.exports = Frog;
