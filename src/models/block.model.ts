import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { Block } from '../types/schema';
import UserModel from './user.model';

class BlockModel extends Model implements Block {
  id!: number;
  userId!: number;
  blockedId!: number;
}

BlockModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: UserModel, key: 'id' },
      allowNull: false,
    },
    blockedId: {
      type: DataTypes.INTEGER,
      references: { model: UserModel, key: 'id' },
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Block', freezeTableName: true, timestamps: false }
);

UserModel.belongsToMany(UserModel, {
  through: BlockModel,
  as: 'blocked',
  foreignKey: 'blockedId',
});
BlockModel.belongsTo(UserModel, { as: 'blocking', foreignKey: 'blockedId' });
BlockModel.sync();
export default BlockModel;
