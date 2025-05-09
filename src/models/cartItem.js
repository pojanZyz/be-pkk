import { DataTypes } from 'sequelize';

/**
 * Fungsi init model CartItem
 * @param {Sequelize} sequelize
 * @returns {Model}
 */

export default (sequelize) => {
  return sequelize.define('CartItem', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });
};
