import getApi from "../../utils/response";
import AddressService from "../../services/address";

const AddressController = {
  getAddress: async (req, res, next) => {
    try {
      const { id } = req.user;
      const data = await AddressService.getAddress(id);

      res.status(200).json(getApi({ suc: true, data }));
    } catch (err) {
      next(err);
    }
  },

  putAddress: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { districtId } = req.params;
      await AddressService.putAddress(id, districtId);

      res.status(200).json(getApi({ suc: true }));
    } catch (err) {
      next(err);
    }
  },
};

export default AddressController;
