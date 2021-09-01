import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import AddressController from "../controllers/address";
import { AddressValidator } from "../middlewares/validators/address/validation";

const router = Router();

function addressRouter(root) {
  root.use("/address", router);

  router.use(auth.isAuthenticated);
  router.get("/me", AddressController.getAddress);
  router.post("/me", AddressValidator.getNearDistricts, AddressController.postAddress);
  router.put("/me/:districtId", AddressController.putAddress);
  router.get("/districts", AddressController.getDistricts);
  router.get("/me/near-districts", AddressValidator.getNearDistricts, AddressController.getNearDistricts);
}

export default addressRouter;
