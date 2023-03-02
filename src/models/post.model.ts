import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { Post } from '../types/schema';

class PostModel extends Model implements Post {
  id!: number;
  desc!: string;
  image!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

PostModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    desc: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
  },
  { sequelize, timestamps: true, modelName: 'Post', freezeTableName: true }
);

PostModel.sync();
export default PostModel;
