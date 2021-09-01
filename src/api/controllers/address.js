import getApi from "../../utils/response";
import AddressService from "../../services/address";

const AddressController = {
  getAddress: async (req, res, next) => {
    try {
      const { id } = req.user;
      const address = await AddressService.getAddress(id);

      res.status(200).json(getApi({ suc: true, data: address }));
    } catch (err) {
      next(err);
    }
  },

  postAddress: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { scope } = req.query;
      await AddressService.postAddress(id, scope);

      res.status(200).json(getApi({ suc: true, mes: "활동지역 변경완료." }));
    } catch (err) {
      next(err);
    }
  },

  putAddress: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { districtId } = req.params;
      await AddressService.putAddress(id, districtId);

      res.status(200).json(getApi({ suc: true, mes: "기준지역 변경완료" }));
    } catch (err) {
      next(err);
    }
  },

  getDistricts: async (req, res, next) => {
    try {
      const { name } = req.query;

      const districts = await AddressService.getDistricts(name);
      res.status(200).json(getApi({ suc: true, data: districts }));
    } catch (err) {
      next(err);
    }
  },

  getNearDistricts: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { scope } = req.query;
      const nearDistricts = await AddressService.getNearDistricts(id, scope);

      res.status(200).json(getApi({ suc: true, data: nearDistricts }));
    } catch (err) {
      next(err);
    }
  },
};

export default AddressController;
