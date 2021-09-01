import joi from "joi";

const schema = {
  postMessage: joi.object({
    content: joi.string().required(),
  }),
  putStatus: joi.object({
    type: joi.string().valid("contract", "reward", "hold").required(),
  }),
};

export default schema;
