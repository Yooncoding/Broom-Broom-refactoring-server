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
};

export default AddressController;
