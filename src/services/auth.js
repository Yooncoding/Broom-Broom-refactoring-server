import CustomError from "../utils/errorhandle";
import User from "../models/User";
import UserAddress from "../models/UserAddress";
import bcrypt from "bcrypt";

const AuthService = {
  signUp: async (email, nickname, password, name) => {
    try {
      const existEmail = await User.findOne({ where: { email } });
      if (existEmail) throw new CustomError("EXIST_EMAIL", 400, "이미 존재하는 이메일입니다.");
      const existNickname = await User.findOne({ where: { nickname } });
      if (existNickname) throw new CustomError("EXIST_NICKNAME", 400, "이미 존재하는 닉네임입니다.");

      const user = await User.create({ email, nickname, password, name });
      await UserAddress.create({ userId: user.id });

      return user;
    } catch (err) {
      throw err;
    }
  },

  signIn: async (email, password) => {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new CustomError("REQUIRED_SIGNUP", 401, "가입되지 않은 이메일입니다.");

      const result = await bcrypt.compare(password, user.password);
      if (!result) throw new CustomError("PASSWORD_IS_WRONG", 401, "비밀번호가 일치하지 않습니다.");

      return user;
    } catch (err) {
      throw err;
    }
  },
};

export default AuthService;
