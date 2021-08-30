import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import AdminController from "../controllers/admin";

const router = Router();

function adminRouter(root) {
  root.use("/admin", router);

  router.use(auth.isAdmin);
  router.get("/cog", AdminController.getCog);
  router.put("/cog/:cogId");
  router.delete("/cog/:cogId");
}

export default adminRouter;
