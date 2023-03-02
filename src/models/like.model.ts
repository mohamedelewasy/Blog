import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { Like } from '../types/schema';

class LikeModel extends Model implements Like {
  userId!: number;
  postId!: number;
}

LikeModel.init(
  {
    userId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' }, allowNull: false },
    postId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' }, allowNull: false },
  },
  { sequelize, modelName: 'Like', freezeTableName: true }
);

LikeModel.sync();
export default LikeModel;
