import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { View } from '../types/schema';
import UserModel from './user.model';

class ViewModel extends Model implements View {
  readonly id!: number;
  userId!: number;
  viewId!: number;
}

ViewModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' }, allowNull: false },
    viewId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' }, allowNull: false },
  },
  { sequelize, modelName: 'View', freezeTableName: true, timestamps: false }
);

UserModel.belongsToMany(UserModel, { through: ViewModel, as: 'view', foreignKey: 'userId' });
ViewModel.belongsTo(UserModel, { as: 'viewers', foreignKey: 'userId' });

ViewModel.sync();
export default ViewModel;
