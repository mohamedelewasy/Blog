import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { Like } from '../types/schema';

class LikeModel extends Model implements Like {
  readonly id!: number;
  userId!: number;
  postId!: number;
}

LikeModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' }, allowNull: false },
    postId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' }, allowNull: false },
  },
  { sequelize, modelName: 'Like', freezeTableName: true, timestamps: false }
);

LikeModel.sync();
export default LikeModel;
