import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { Follow } from '../types/schema';

class FollowModel extends Model implements Follow {
  userId!: number;
  followId!: number;
}

FollowModel.init(
  {
    userId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' }, allowNull: false },
    followId: {
      type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' },
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Follow', freezeTableName: true }
);

FollowModel.sync();
export default FollowModel;
