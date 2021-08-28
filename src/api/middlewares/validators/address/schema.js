import joi from "joi";

const schema = {
  getNearDistricts: joi.object({
    scope: joi.number().integer().min(0).max(5).required(),
  }),
};

export default schema;
