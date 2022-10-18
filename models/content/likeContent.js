const LikeContent = (sequelize, Sequelize) => {
  return sequelize.define("likeContent", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};

export default LikeContent;
