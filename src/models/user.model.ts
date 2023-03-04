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
    email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        function(val: string) {
          if (val.length < 6) throw new Error('password must be 6 or greater');
        },
      },
    },
    isBlocked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 'false' },
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 'false' },
    role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
    plan: { type: DataTypes.ENUM('free', 'premium', 'pro'), defaultValue: 'free' },
    token: { type: DataTypes.STRING },
  },
  { timestamps: true, sequelize, modelName: 'User', freezeTableName: true }
);

UserModel.belongsToMany(UserModel, {
  through: 'Block',
  as: 'blockedUsers',
  foreignKey: 'blockedId',
});
UserModel.belongsToMany(UserModel, {
  through: 'Follow',
  as: 'FollowingUsers',
  foreignKey: 'followId',
});
UserModel.belongsToMany(UserModel, {
  through: 'Follow',
  as: 'FollowersUsers',
  foreignKey: 'userId',
});
UserModel.belongsToMany(UserModel, {
  through: 'View',
  as: 'viewUsers',
  foreignKey: 'userId',
});

UserModel.sync();
export default UserModel;
