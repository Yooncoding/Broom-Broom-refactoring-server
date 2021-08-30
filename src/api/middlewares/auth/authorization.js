import CustomError from "../../../utils/errorhandle";

const auth = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      const error = new CustomError("UNAUTHENTICATED", 401, "로그인이 필요합니다.");
      next(error);
    }
  },

  isAdmin: (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.role) next();
      else {
        const error = new CustomError("ONLY_ADMIN_ACCESS", 403, "관리자만 접근이 가능합니다.");
        next(error);
      }
    } else {
      const error = new CustomError("UNAUTHENTICATED", 401, "로그인이 필요합니다.");
      next(error);
    }
  },
};

export default auth;
