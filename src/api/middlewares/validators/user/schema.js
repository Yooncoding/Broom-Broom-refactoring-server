import joi from "joi";

const schema = {
  signUp: joi.object({
    email: joi.string().email().min(6).required(),
    nickname: joi
      .string()
      .regex(/^[가-힣|a-z|A-Z|0-9|]{2,8}$/)
      .required(), // 특수문자 제외 2~8글자
    name: joi
      .string()
      .regex(/^[가-힣]{2,8}$/)
      .required(), // 한글 2~8글자
    password: joi
      .string()
      .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/)
      .required(), // 영문, 숫자, 특수문자 혼합하여 8~16글자
  }),

  postEmail: joi.object({
    email: joi.string().email().min(6).required(),
  }),

  postEdit: joi.object({
    nickname: joi
      .string()
      .regex(/^[가-힣|a-z|A-Z|0-9|]{2,8}$/)
      .required(), // 특수문자 제외 2~8글자
    name: joi
      .string()
      .regex(/^[가-힣]{2,8}$/)
      .required(), // 한글 2~8글자
  }),

  postPoint: joi.object({
    type: joi.string().valid("refund", "charge").required(),
    chargeAmount: joi.number().integer().min(1000),
    refundAmount: joi.number().integer().min(1000),
    bankName: joi.string(),
    bankAccount: joi.string(),
  }),

  getUserPost: joi.object({
    tab: joi.string().valid("sale", "done", "hold"),
    order: joi.string().valid("date", "price_asc", "price_desc", "deadline"),
  }),
};

export default schema;
