import { DataTypes } from 'sequelize';


/**
 * Fungsi init model Product
 * @param {Sequelize} sequelize 
 * @returns {Model}
 */

export default (sequelize) => {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'customer'),
      defaultValue: 'customer',
    },
  }, {
    timestamps: true,  // Menyimpan createdAt dan updatedAt
  });
  return User;
};
