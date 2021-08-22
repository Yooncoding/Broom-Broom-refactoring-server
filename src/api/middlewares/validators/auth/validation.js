import schema from "./schema";
import CustomError from "../../../../utils/errorhandle";

const AuthValidators = {
  signUp: async (req, res, next) => {
    const value = await schema.signUp.validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 406, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

export default AuthValidators;
