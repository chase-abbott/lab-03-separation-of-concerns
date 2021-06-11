const pool = require('../lib/utils/pool');

class Dog {
  id;
  numberOfDogs;

  constructor(row){
    this.id = row.id,
    this.numberOfDogs = row.number_of_dogs;
  }

  static async insertDog({ numberOfDogs }){
    const { rows } = await pool.query(
      'INSERT INTO dogs (number_of_dogs) VALUES ($1) RETURNING *',
      [numberOfDogs]
    );
    return new Dog(rows[0]);
  }

  static async selectDogs(){
    const { rows } = await pool.query(
      'SELECT * FROM dogs'
    );
    return rows.map(dog => new Dog(dog));
  }

  static async updateDog(id, { numberOfDogs }) {
    const { rows } = await pool.query(
      `UPDATE dogs
      SET number_of_dogs = $1
      WHERE id = $2
      RETURNING *`,
      [numberOfDogs, id]
    );
    return new Dog(rows[0]);
  }

  static async deleteDog(id) {
    const { rows } = await pool.query(
      `DELETE FROM dogs
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Dog(rows[0]);
  }
}

module.exports = Dog;
