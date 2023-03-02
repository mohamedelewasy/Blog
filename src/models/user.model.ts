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
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    profileImage: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    isBlocked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 'false' },
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 'false' },
    role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
    plan: { type: DataTypes.ENUM('free', 'premium', 'pro'), defaultValue: 'free' },
  },
  { timestamps: true, sequelize, modelName: 'User', freezeTableName: true }
);

UserModel.sync();
export default UserModel;
