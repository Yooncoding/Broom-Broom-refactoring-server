import { Router } from "express";
import AddressController from "../controllers/address";
import { AddressValidator } from "../middlewares/validators/address/validation";
import auth from "../middlewares/auth/authorization";

const router = Router();

function addressRouter(root) {
  root.use("/address", router);

  router.use(auth.isAuthenticated);
  router.get("/me", AddressController.getAddress);
  router.post("/me");
  router.put("/me/:districtId", AddressController.putAddress);
  router.get("/districts", AddressController.getDistricts);
  router.get("/me/near-districts", AddressValidator.getNearDistricts, AddressController.getNearDistricts);
}

export default addressRouter;
