import { Sequelize, DataTypes } from "sequelize";
// const { DataTypes } = require('sequelize');
 const sequelize = require('../config/database'); // assuming your Sequelize instance is set up here

const Admission = sequelize.define('Admission', {
  // Fields based on the table schema

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  courseApplied: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  studentName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  fatherName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  motherName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING(255), // URL or file path to the image
    allowNull: false,
  },

  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  state: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  pinCode: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },

  schoolName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  schoolCity: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  fatherOccupation: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  fatherAddress: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  studentEmail: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  parentContact: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },

  studentContact: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
}, {
  // Options to control table creation and metadata
  tableName: 'admission', // Ensure table name matches
  timestamps: false, // If you don't want Sequelize to add timestamps
});

// Sync the model with the database (if needed)
sequelize.sync().then(() => {
  console.log('Admission table has been synced');
});

module.exports = Admission;
