import bcrypt from "bcryptjs";
import db from "../../config/riungDb.js";

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password, salt);
    const user = await User.create({ ...req.body, password });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });
      await user.setRoles(roles);
    } else {
      await user.setRoles([2]);
    }

    user.save();
    res
      .status(200)
      .send({ success: true, message: "User was registered successfully!" });
  } catch (error) {
    next(error);
  }
};

export default register;
