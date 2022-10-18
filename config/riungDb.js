import Sequelize from "sequelize";
import Role from "../models/role.js";
import User from "../models/user.js";
import Content from "../models/content/content.js";
import Comment from "../models/content/comment.js";
import LikeContent from "../models/content/likeContent.js";
import LikeComment from "../models/content/likeComment.js";

const sequelize = new Sequelize("riung_db", "root", "admin", {
  host: "riung_db",
  dialect: "mysql",
  operatorAliases: false,
  logging: false,
  pool: {
    max: process.env.POOL_MAX,
    min: process.env.POOL_MIN,
    acquire: process.env.POOL_ACQUIRE,
    idle: process.env.POOL_IDLE,
  },
});

const db = {
  Sequelize,
  sequelize,
  content: Content(sequelize, Sequelize),
  comment: Comment(sequelize, Sequelize),
  likeContent: LikeContent(sequelize, Sequelize),
  likeComment: LikeComment(sequelize, Sequelize),
  user: User(sequelize, Sequelize),
  role: Role(sequelize, Sequelize),
  ROLES: ["admin", "user"],
};

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.user.hasMany(db.content, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});
db.content.belongsTo(db.user);

db.user.hasMany(db.comment, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});
db.comment.belongsTo(db.user);

db.content.hasMany(db.comment, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});
db.comment.belongsTo(db.content);

db.user.hasMany(db.likeContent, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});
db.likeContent.belongsTo(db.user);

db.user.hasMany(db.likeComment, {
  onUpdate: "CASCADE",
  onDelete: "RESTRICT",
});
db.likeComment.belongsTo(db.user);

export default db;
