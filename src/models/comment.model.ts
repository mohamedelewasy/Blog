import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { Comment } from '../types/schema';
import PostModel from './post.model';
import UserModel from './user.model';

class CommentModel extends Model implements Comment {
  id!: number;
  comment!: string;
  postId!: number;
  userId!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

CommentModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    comment: { type: DataTypes.STRING, allowNull: false },
    postId: { type: DataTypes.INTEGER, references: { model: 'Post', key: 'id' } },
    userId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' } },
  },
  { sequelize, timestamps: true, modelName: 'Comment', freezeTableName: true }
);

UserModel.belongsToMany(PostModel, { through: CommentModel, foreignKey: 'userId' });
PostModel.belongsToMany(UserModel, { through: CommentModel, foreignKey: 'postId' });
CommentModel.belongsTo(UserModel, { foreignKey: 'userId' });
CommentModel.belongsTo(PostModel, { foreignKey: 'postId' });

CommentModel.sync();
export default CommentModel;
