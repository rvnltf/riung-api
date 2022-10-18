import db from "../config/riungDb.js";
import createError from "http-errors";
import { BadRequest } from "./errors.js";

const ROLES = db.ROLES;
const User = db.user;

export const checkDuplicate = async (req, res, next) => {
  try {
    const username = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    const email = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (username)
      throw new BadRequest(
        `Failed! Username '${req.body.username}' is already in use!`
      );
    if (email)
      throw new BadRequest(
        `Failed! Email '${req.body.email}' is already in use!`
      );
    next();
  } catch (error) {
    next(error);
  }
};

export const rolesExisted = async (req, res, next) => {
  // console.log(ROLES.includes("admin"));
  try {
    const roles = await req.body.roles;
    if (roles) {
      roles.map((role) => {
        if (!ROLES.includes(role))
          throw new BadRequest(`Failed! Role '${role}' doesn't exist!`);
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
