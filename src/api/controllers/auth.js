import getApi from "../../utils/response";
import AuthService from "../../services/auth";
import passport from "passport";

const AuthController = {
  signUp: async (req, res, next) => {
    try {
      const { email, nickname, password, name } = req.body;
      const user = await AuthService.signUp(email, nickname, password, name);

      res.status(201).json(getApi({ suc: true, data: user }));
    } catch (err) {
      next(err);
    }
  },

  signIn: async (req, res, next) => {
    passport.authenticate("local", { session: false }, (authError, user) => {
      if (authError) return next(authError);

      req.login(user, (loginError) => {
        if (loginError) return next(loginError);

        res.status(201).json(getApi({ suc: true, mes: "로그인 성공" }));
      });
    })(req, res, next);
  },

  postEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const key = await AuthService.postEmail(email);

      res
        .cookie("secretKey", key, { expiresIn: "10m" })
        .status(201)
        .json(getApi({ suc: true, data: key }));
    } catch (err) {
      next(err);
    }
  },

  putEmail: (req, res, next) => {
    try {
      const { key } = req.body;
      const { secretKey } = req.cookies;
      AuthService.compareKey(key, secretKey);

      res
        .clearCookie("secretKey")
        .status(200)
        .json(getApi({ suc: true }));
    } catch (err) {
      next(err);
    }
  },

  postPassword: async (req, res, next) => {
    try {
      const { email, name } = req.body;
      const password = await AuthService.postPassword(email, name);

      res.status(201).json(getApi({ suc: true, data: password }));
    } catch (err) {
      next(err);
    }
  },

  logout: async (req, res, next) => {
    try {
      req.logout();

      res.status(200).json(getApi({ suc: true, mes: "로그아웃 완료. 로그인페이지로 이동합니다." }));
    } catch (err) {
      next(err);
    }
  },

  deleteAccount: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { password } = req.body;
      await AuthService.deleteAccount(id, password);

      res.status(200).json(getApi({ suc: true, mes: "회원탈퇴 완료. 로그인페에지로 이동합니다." }));
    } catch (err) {
      next(err);
    }
  },
};

export default AuthController;
