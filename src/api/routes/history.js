import { Router } from "express";
import auth from "../middlewares/auth/authorization";

const router = Router();

function histroyRouter(root) {
  root.use("/usage-history", router);

  router.use(auth.isAuthenticated);
  router.get("/"); // ?tab=buy, ?tab=selling, ?tab=sold
  router.post("/review/:postId");
}

export default histroyRouter;
