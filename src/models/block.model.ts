import { DataTypes, Model } from 'sequelize';

import sequelize from '../config/db';
import { Block } from '../types/schema';

class BlockModel extends Model implements Block {
  userId!: number;
  blockedId!: number;
}

BlockModel.init(
  {
    userId: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' }, allowNull: false },
    blockedId: {
      type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' },
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Block', freezeTableName: true }
);

BlockModel.sync();
export default BlockModel;
