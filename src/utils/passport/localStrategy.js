import passport from "passport";
import passportLocal from "passport-local";
import AuthService from "../../services/auth";

const LocalStrategy = passportLocal.Strategy;

export default function local() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await AuthService.signIn(email, password);
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
}
