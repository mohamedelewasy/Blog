import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { Follow } from '../types/schema';

class FollowModel extends Model implements Follow {
  readonly id!: number;
  userId!: number;
  followId!: number;
}

FollowModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' }, allowNull: false },
    followId: {
      type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' },
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Follow', freezeTableName: true, timestamps: false }
);

FollowModel.sync();
export default FollowModel;
