import sequelize from "../config/db";
import { Follow } from "../types/schema";
import UserModel from "./user.model";
import { DataTypes, Model } from "sequelize";

class FollowModel extends Model implements Follow {
  readonly id!: number;
  userId!: number;
  followId!: number;
}

FollowModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "User", key: "id" },
      allowNull: false,
    },
    followId: {
      type: DataTypes.INTEGER,
      references: { model: "User", key: "id" },
      allowNull: false,
    },
  },
  { sequelize, modelName: "Follow", freezeTableName: true, timestamps: false }
);

UserModel.belongsToMany(UserModel, {
  through: FollowModel,
  foreignKey: "userId",
  as: "follower",
});
UserModel.belongsToMany(UserModel, {
  through: FollowModel,
  foreignKey: "followId",
  as: "following",
});
FollowModel.belongsTo(UserModel, {
  foreignKey: "followId",
  as: "Following",
});
FollowModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "Follower",
});

FollowModel.sync();
export default FollowModel;
