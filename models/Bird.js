const pool = require('../lib/utils/pool');

class Bird {
  id;
  numberOfBirds;

  constructor(row){
    this.id = row.id,
    this.numberOfBirds = row.number_of_birds;
  }

  static async insertBird({ numberOfBirds }){
    const { rows } = await pool.query(
      'INSERT INTO birds (number_of_birds) VALUES ($1) RETURNING *',
      [numberOfBirds]
    );
    return new Bird(rows[0]);
  }

  static async selectBirds(){
    const { rows } = await pool.query(
      'SELECT * FROM birds'
    );
    return rows.map(bird => new Bird(bird));
  }

  static async updateBird(id, { numberOfBirds }){
    
    const { rows } = await pool.query(`
    UPDATE birds
    SET number_of_birds = $1
    WHERE id = $2
    RETURNING *`,
    [numberOfBirds, id]);

    return new Bird(rows[0]);
  }

  static async deleteBird(id){
    const { rows } = await pool.query(`
    DELETE FROM birds WHERE (id = $1) RETURNING *`,
    [id]);

    return new Bird(rows[0]);
  }
}

module.exports = Bird;
