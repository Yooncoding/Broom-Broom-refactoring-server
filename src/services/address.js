import UserAddress from "../models/UserAddress";
import District from "../models/District";

const AddressService = {
  getAddress: async (userId) => {
    const address = await UserAddress.findOne({
      where: { userId },
      include: { model: District, attributes: ["simpleName"] },
    });
    return address;
  },
};

export default AddressService;
