import joi from "joi";

const schema = {
  getCog: joi.object({
    tab: joi.string().valid("all", "deal", "hold"),
    filter: joi.string().valid("true", "false"),
    type: joi.string().valid("all", "refund", "charge"),
    page: joi.number().integer(),
  }),
};

export default schema;
