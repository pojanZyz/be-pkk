import { DataTypes } from 'sequelize';

/**
 * Fungsi init model Product
 * @param {Sequelize} sequelize 
 * @returns {Model}
 */

export default (sequelize) => {
  return sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
