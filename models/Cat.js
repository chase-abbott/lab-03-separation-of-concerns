const pool = require('../lib/utils/pool');

class Cat {
  id;
  numberOfCats;

  constructor(row){
    this.id = row.id;
    this.numberOfCats = row.number_of_cats;
  }

  static async insertCat({ numberOfCats }){
    const { rows } = await pool.query(
      'INSERT INTO cats (number_of_cats) VALUES ($1) RETURNING *'
      , [numberOfCats]
    );

    return new Cat(rows[0]);
  }

  static async selectCats(){
    const { rows } = await pool.query(
      'SELECT * FROM cats'
    );

    return rows.map(cat => new Cat(cat));
  }

  static async selectCatById(id){
    const { rows } = await pool.query(`
    SELECT * FROM cats
    WHERE id = $1`
    , [id]);

    return new Cat(rows[0]);
  }

  static async updateCat(id, { numberOfCats }){
    const { rows } = await pool.query(`
    UPDATE cats
    SET number_of_cats = $1
    WHERE id = $2
    RETURNING *`
    , [numberOfCats, id]);
    return new Cat(rows[0]);
  }

  static async deleteCat(id){
    const { rows } = await pool.query(`
    DELETE FROM cats
    WHERE id = $1
    RETURNING *`
    , [id]);

    return new Cat(rows[0]);
  }
}

module.exports = Cat;
