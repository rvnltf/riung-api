const Comment = (sequelize, Sequelize) => {
  return sequelize.define("comment", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    contentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
};

export default Comment;
