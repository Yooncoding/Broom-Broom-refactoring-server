import schema from "./schema";
import CustomError from "../../../../utils/errorhandle";

const AuthValidators = {
  signup: async (req, res, next) => {
    const value = await schema.singup.validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 406, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

export default AuthValidators;
