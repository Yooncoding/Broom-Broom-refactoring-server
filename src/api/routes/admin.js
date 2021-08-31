import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import AdminController from "../controllers/admin";
import { AdminValidator } from "../middlewares/validators/cog/validation";

const router = Router();

function adminRouter(root) {
  root.use("/admin", router);

  router.use(auth.isAdmin);
  router.get("/cog", AdminValidator.getCog, AdminController.getCog);
  router.put("/cog/:cogId", AdminController.putCog);
  router.delete("/cog/:cogId");
}

export default adminRouter;
