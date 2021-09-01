import schema from "./schema";
import CustomError from "../../../../utils/errorhandle";

const ChatValidator = {
  postMessage: (req, res, next) => {
    const value = schema.postMessage.validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

export { ChatValidator };
