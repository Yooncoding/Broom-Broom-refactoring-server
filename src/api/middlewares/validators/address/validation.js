import schema from "./schema";
import CustomError from "../../../../utils/errorhandle";

const AddressValidator = {
  getNearDistricts: (req, res, next) => {
    const value = schema.getNearDistricts.validate(req.query);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

export { AddressValidator };
