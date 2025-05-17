import { DataTypes } from 'sequelize';

/**
 * Fungsi init model OrderItem
 * @param {Sequelize} sequelize
 * @returns {Model}
 */

export default (sequelize) => {
  return sequelize.define('OrderItem', {
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
  });
};
