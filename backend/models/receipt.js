// import { DataTypes } from "sequelize";
// import sequelize from '../database/DB.js';

// const Receipt = sequelize.define('Receipt', {

//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//     admissionNo: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   ReceiptNo: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//   },
//   course: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
//   studentName: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
//   address: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
//   pendingFees: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
//   mode: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
//   particulars: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
//   CGST: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   UTGST: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   total: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//   },
//   amountInWords: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },

//   authSignatory: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },

// }, {
//   tableName: 'receipt', // the table name
//   timestamps: true, //
// });

// export default Receipt;
import { DataTypes } from "sequelize";
import sequelize from '../database/DB.js';

const Receipt = sequelize.define('Receipt', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Auto-increment primary key
  },

  ReceiptNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },

  admissionNo: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true, // Unique admission number
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
  tableName: 'receipt',
  timestamps: true,
  hooks: {
    beforeCreate: async (receipt) => {
      // Generate ReceiptNo as auto-increment (handled by Sequelize)
      const maxReceipt = await Receipt.max('ReceiptNo') || 1000;
      receipt.ReceiptNo = maxReceipt + 1;

      // Generate admissionNo based on business logic, for example:
      const maxAdmissionNo = await Receipt.max('admissionNo') || 1000;
      receipt.admissionNo = `A-${maxAdmissionNo + 1}`;
    }
  }
});

export default Receipt;
