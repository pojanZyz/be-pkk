import { DataTypes } from 'sequelize';

/**
 * Fungsi init model Order
 * @param {Sequelize} sequelize
 * @returns {Model}
 */

export default (sequelize) => {
  return sequelize.define('Order', {
    status: {
      type: DataTypes.ENUM('completed','pending','canceled'),
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
