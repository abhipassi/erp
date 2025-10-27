import { DataTypes } from "sequelize";
import sequelize from '../database/DB.js';

const Receipt = sequelize.define('Receipt', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
    admissionNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ReceiptNo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  course: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  studentName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  pendingFees: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  mode: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  particulars: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  CGST: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  UTGST: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  amountInWords: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  authSignatory: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

}, {
  tableName: 'receipt', // the table name
  timestamps: true, //
});

export default Receipt;
