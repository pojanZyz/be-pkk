import { DataTypes } from 'sequelize';

/**
 * Fungsi init model OrderItem
 * @param {Sequelize} sequelize
 * @returns {Model}
 */

export default (sequelize) => {
  return sequelize.define('OrderItem', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
  });
};
