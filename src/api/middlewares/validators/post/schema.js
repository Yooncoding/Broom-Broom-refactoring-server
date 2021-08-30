import DateExtension from "@joi/date";
import * as JoiImport from "joi";
const joi = JoiImport.extend(DateExtension);

const schema = {
  postPost: joi.object({
    title: joi.string().min(6).max(20).required(),
    content: joi.string().min(10).max(300).required(),
    price: joi.number().integer().min(1000).required(),
    deadline: joi.date().format("YYYY-MM-DD HH:mm").required(),
  }),
};

export default schema;
