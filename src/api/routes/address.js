import { Router } from "express";
import AddressController from "../controllers/address";
import auth from "../middlewares/auth/authorization";
import { AddressValidator } from "../middlewares/validators/address/validation";

const router = Router();

function userRouter(root) {
  root.use("/address", router);

  router.use(auth.isAuthenticated);
  router.get("/me", AddressController.getAddress);
  router.post("/me");
  router.put("/me/:districtId");
  router.get("/districts");
  router.get("/near-districts");
}

export default userRouter;
