import { DataTypes } from 'sequelize';

/**
 * Fungsi init model Cart
 * @param {Sequelize} sequelize
 * @returns {Model}
 */

export default (sequelize) => {
    return sequelize.define('Cart', {
      // Tidak perlu field tambahan
    });
  };
  