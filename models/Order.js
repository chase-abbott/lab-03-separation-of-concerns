const pool = require('../lib/utils/pool');

class Order {
  id;
  quantityOfItems;

  constructor(row) {
    this.id = row.id;
    this.quantityOfItems = row.quantity_of_items;
  }

  static async insertOrder(quantityOfItems) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity_of_items) VALUES ($1) RETURNING *',
      [quantityOfItems]
    );

    return new Order(rows[0]);
  }

  static async selectOrders(){
    const { rows } = await pool.query(
      'SELECT * FROM orders'
    );
    
    return rows.map(order => new Order(order));
  }

  static async selectOrderById(id){
    const { rows } = await pool.query(
      `SELECT * FROM orders 
       WHERE id = $1`,
      [id]
    );
    return new Order(rows[0]);
  }

  static async updateOrder(id, order){
    const { rows } = await pool.query(
      `UPDATE orders
       SET quantity_of_items = $1
       WHERE id = $2
       RETURNING *`,
      [order.quantityOfItems, id]
    );

    return new Order(rows[0]);
  }

  static async deleteOrder(id){
    const { rows } = await pool.query(
      `DELETE FROM orders
      WHERE id = $1
      RETURNING *`,
      [id]
    );

    return new Order(rows[0]);
  }
}

module.exports = Order;
