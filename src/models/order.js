import { DataTypes } from 'sequelize';

/**
 * Fungsi init model Order
 * @param {Sequelize} sequelize
 * @returns {Model}
 */

export default (sequelize) => {
  return sequelize.define('Order', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
