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
        .cookie("key", key, { expiresIn: "10m" })
        .status(201)
        .json(getApi({ suc: true, data: key }));
    } catch (err) {
      next(err);
    }
  },
};

export default AuthController;
