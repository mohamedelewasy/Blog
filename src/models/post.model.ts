import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { Post, User } from '../types/schema';
import UserModel from './user.model';

class PostModel extends Model implements Post {
  id!: number;
  desc!: string;
  image!: string;
  userId!: User;
  createdAt!: Date;
  updatedAt!: Date;
}

PostModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    desc: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: UserModel, key: 'id' },
      allowNull: false,
    },
  },
  { sequelize, timestamps: true, modelName: 'Post', freezeTableName: true }
);

UserModel.hasMany(PostModel, { foreignKey: 'userId' });
PostModel.belongsTo(UserModel, { foreignKey: 'userId' });

PostModel.sync();
export default PostModel;
