const Content = (sequelize, Sequelize) => {
  return sequelize.define("content", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    view: {
      type: Sequelize.INTEGER,
    },
    private: {
      type: Sequelize.BOOLEAN,
    },
  });
};

export default Content;
