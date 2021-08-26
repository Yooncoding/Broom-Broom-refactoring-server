import schema from "./schema";
import CustomError from "../../../../utils/errorhandle";

const AuthValidator = {
  signUp: (req, res, next) => {
    const value = schema.signUp.validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },

  postEmail: (req, res, next) => {
    const value = schema.postEmail.validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

export default AuthValidator;
