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
};

export { PostValidator };
