import joi from "joi";

const schema = {
  postMessage: joi.object({
    content: joi.string().required(),
  }),
};

export default schema;
