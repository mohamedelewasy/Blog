import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { Like } from '../types/schema';
import PostModel from './post.model';
import UserModel from './user.model';

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
UserModel.belongsToMany(PostModel, { through: LikeModel, foreignKey: 'userId' });
PostModel.belongsToMany(UserModel, { through: LikeModel, foreignKey: 'postId' });
LikeModel.belongsTo(UserModel, { foreignKey: 'userId' });
LikeModel.belongsTo(PostModel, { foreignKey: 'postId' });

LikeModel.sync();
export default LikeModel;
