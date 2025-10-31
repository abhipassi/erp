import { DataTypes } from "sequelize";
import sequelize from "../database/DB.js";

const Course = sequelize.define(
  "Course",
  {
    courseID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseFees: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    courseDuration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Courses", 
  }
);

export default Course;
