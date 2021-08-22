import getApi from "../../utils/response";
import AuthService from "../../services/auth";

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
};

export default AuthController;
