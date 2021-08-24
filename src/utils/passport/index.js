import passport from "passport";
import local from "./localStrategy";
import UserService from "../../services/user";

export default function passportConfig() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    UserService.getUserById(id)
      .then((user) => done(null, user))
      .catch((e) => done(e));
  });

  local();
}
