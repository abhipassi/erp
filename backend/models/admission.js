import { DataTypes } from "sequelize";
import sequelize from "../database/DB.js";

const Admission = sequelize.define(
  "Admission",
  {
    studentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "studentId", 
    },

    rollNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    admissionNo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    courseApplied: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
      type: DataTypes.STRING(255),
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "admission",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Admission;
