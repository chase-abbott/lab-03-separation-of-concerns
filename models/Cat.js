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
}

module.exports = Cat;
