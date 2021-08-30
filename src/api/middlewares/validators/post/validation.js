import schema from "./schema";
import CustomError from "../../../../utils/errorhandle";

const PostValidator = {
  postPost: (req, res, next) => {
    const value = schema.postPost.validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },

  getSearch: (req, res, next) => {
    const value = schema.getSearch.validate(req.query);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

const MainValidator = {
  getMainPosts: (req, res, next) => {
    const value = schema.getMainPosts.validate(req.query);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

const HistoryValidator = {
  getHistoryPosts: (req, res, next) => {
    const value = schema.getHistoryPosts.validate(req.query);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },

  postReviewPost: (req, res, next) => {
    const value = schema.postReviewPost.validate(req.query);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

export { PostValidator, MainValidator, HistoryValidator };
