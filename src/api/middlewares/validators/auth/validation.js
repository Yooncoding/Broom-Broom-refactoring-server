import { signUp, postEmail } from "./schema";
import CustomError from "../../../../utils/errorhandle";

const AuthValidators = {
  signUp: (req, res, next) => {
    const value = signUp.validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
  postEmail: (req, res, next) => {
    const value = postEmail.validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

export default AuthValidators;
