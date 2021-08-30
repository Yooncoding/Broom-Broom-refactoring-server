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

  getSearch: joi.object({
    q: joi.string().min(2).required(),
    order: joi.string().valid("date", "price_asc", "price_desc", "deadline"),
    filter: joi.string().valid("true", "false"),
    page: joi.number().integer(),
  }),

  getMainPosts: joi.object({
    page: joi.number().integer(),
  }),

  getHistoryPosts: joi.object({
    tab: joi.string().valid("buy", "selling", "sold"),
    page: joi.number().integer(),
  }),

  postReviewPost: joi.object({
    review: joi.number().integer().min(0).max(10).required(),
  }),
};

export default schema;
