import CustomError from "../utils/errorhandle";
import User from "../models/User";
import UserAddress from "../models/UserAddress";
import bcrypt from "bcrypt";
import { generateKey, sendKeyByEmail, generatePwd, sendPwdByEmail } from "../utils/nodemailer";

const AuthService = {
  signUp: async (email, nickname, password, name) => {
    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) throw new CustomError("EXIST_EMAIL", 409, "이미 존재하는 이메일입니다.");

    const existNickname = await User.findOne({ where: { nickname } });
    if (existNickname) throw new CustomError("EXIST_NICKNAME", 409, "이미 존재하는 닉네임입니다.");

    const user = await User.create({ email, nickname, password, name });
    await UserAddress.create({ userId: user.id });

    return user;
  },

  signIn: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new CustomError("REQUIRED_SIGNUP", 400, "가입되지 않은 이메일입니다.");

    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new CustomError("PASSWORD_IS_WRONG", 400, "비밀번호가 일치하지 않습니다.");

    return user;
  },

  postEmail: async (email) => {
    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) throw new CustomError("EXIST_EMAIL", 409, "이미 존재하는 이메일입니다.");

    const key = generateKey();
    await sendKeyByEmail(email, key);

    return key;
  },

  compareKey: (key, secretKey) => {
    if (!secretKey) throw new CustomError("NOT_COOKIE", 404, "인증번호 전송을 누르지 않아 쿠키가 없습니다.");

    if (key !== secretKey) throw new CustomError("KEY_IS_WRONG", 400, "인증번호가 일치하지 않습니다.");

    return true;
  },

  postPassword: async (email, name) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new CustomError("REQUIRED_SIGNUP", 400, "가입되지 않은 이메일입니다.");

    if (user.name !== name) throw new CustomError("USERINFO_IS_WRONG", 400, "일치하는 이메일, 이름이 없습니다.");

    const pwd = generatePwd();
    await sendPwdByEmail(email, name, pwd);
    const password = await bcrypt.hash(pwd, await bcrypt.genSalt(12));
    await User.update({ password }, { where: { email } });

    return pwd;
  },

  deleteAccount: async (userId, password) => {
    const user = await User.findByPk(userid);
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) throw new CustomError("PASSWORD_IS_WRONG", 400, "비밀번호가 일치하지 않습니다.");

    return await User.destroy({ where: { id: userId } });
  },
};

export default AuthService;
