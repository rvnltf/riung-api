const User = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });
};

export default User;
