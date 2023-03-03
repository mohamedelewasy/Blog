import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { View } from '../types/schema';

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
  { sequelize, modelName: 'View', freezeTableName: true }
);

ViewModel.sync();
export default ViewModel;
