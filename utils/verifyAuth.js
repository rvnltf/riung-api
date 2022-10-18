import JWT from "jsonwebtoken";
import db from "../config/riungDb.js";
import createError from "http-errors";
import { BadRequest } from "./errors.js";

const User = db.user;
const Content = db.content;
const Comment = db.comment;

export const verifyToken = async (req, res, next) => {
  try {
    let token = await req.headers.authorization;
    if (!token) throw new BadRequest("You are not authenticated!");

    token = await token.replace(/^Bearer\s+/, "");
    JWT.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) throw new BadRequest("Token is not valid!");
      req.userId = user.id;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    user.getRoles().then((roles) => {
      roles.map((v) => {
        if (!v.name === "admin") throw new BadRequest("Required admin role!");
      });
      next();
    });
  } catch (error) {
    next(error);
  }
};

export const isUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    user.getRoles().then((roles) => {
      roles.map((v) => {
        if (!v.name === "user") throw new BadRequest("Required user role!");
      });
      next();
    });
  } catch (error) {
    next(error);
  }
};

export const isOwnerContent = async (req, res, next) => {
  try {
    const content = await Content.findOne({ where: { id: req.params.id } });

    if (content.userId !== req.userId)
      throw new BadRequest("Invalid update data! Not your content");

    next();
  } catch (error) {
    next(error);
  }
};

export const isOwnerComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } });

    if (comment.userId !== req.userId)
      throw new BadRequest("Invalid update data! Not your comment");

    next();
  } catch (error) {
    next(error);
  }
};
