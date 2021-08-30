import { Router } from "express";
import auth from "../middlewares/auth/authorization";

const router = Router();

function adminRouter(root) {
  root.use("/admin", router);

  router.use(auth.isAdmin);
  router.get("/cog");
  router.put("/cog/:cogId");
  router.delete("/cog/:cogId");
}

export default adminRouter;
