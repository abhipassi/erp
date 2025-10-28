import { DataTypes } from "sequelize";
import sequelize from "../database/DB.js";
import bcrypt from "bcryptjs";

const Login = sequelize.define("Login", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },

  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },

  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM("admin", "staff", "student"),
    defaultValue: "student",
  },

  last_login: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  refresh_token: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
}, {
  tableName: "login",
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password_hash) {
        const salt = await bcrypt.genSalt(10);
        user.password_hash = await bcrypt.hash(user.password_hash, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed("password_hash")) {
        const salt = await bcrypt.genSalt(10);
        user.password_hash = await bcrypt.hash(user.password_hash, salt);
      }
    },
  },
});

// Instance method to check password
Login.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};

export default Login;
