import CustomError from "../utils/errorhandle";
import User from "../models/User";
import UserAddress from "../models/UserAddress";

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
};

export default AuthService;
