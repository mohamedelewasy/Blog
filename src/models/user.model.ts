import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { User } from '../types/schema';

class UserModel extends Model implements User {
  readonly id!: number;
  firstName!: string;
  lastName!: string;
  profileImage!: string;
  email!: string;
  password!: string;
  isBlocked!: boolean;
  isAdmin!: boolean;
  role!: string;
  plan!: string;
  token!: string;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: {
      type: DataTypes.STRING,
      validate: { len: [2, 32] },
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      validate: { len: [2, 32] },
      allowNull: true,
    },
    profileImage: { type: DataTypes.STRING },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: { msg: 'invalid email format' } },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        function(val: string) {
          if (val.length < 6) throw new Error('password must be 6 or greater');
        },
      },
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 'false',
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 'false',
    },
    plan: {
      type: DataTypes.ENUM('free', 'premium', 'pro'),
      defaultValue: 'free',
    },
    token: { type: DataTypes.STRING },
  },
  { timestamps: true, sequelize, modelName: 'User', freezeTableName: true }
);

UserModel.sync();
export default UserModel;
