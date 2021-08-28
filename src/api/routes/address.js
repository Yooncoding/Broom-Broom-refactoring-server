import { Router } from "express";
import AddressController from "../controllers/address";
import auth from "../middlewares/auth/authorization";

const router = Router();

function addressRouter(root) {
  root.use("/address", router);

  router.use(auth.isAuthenticated);
  router.get("/me", AddressController.getAddress);
  router.post("/me");
  router.put("/me/:districtId", AddressController.putAddress);
  router.get("/districts");
  router.get("/near-districts");
}

export default addressRouter;
