const LikeComment = (sequelize, Sequelize) => {
  return sequelize.define("likeComment", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    commentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};

export default LikeComment;
