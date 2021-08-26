import User from "../models/User";
import AddressService from "./address";

const UserService = {
  getUserById: async (id) => {
    return await User.findByPk(id);
  },

  getUser: async (userId) => {
    const user = await User.findByPk(userId);
    const address = await AddressService.getAddress(userId);

    let data = {};
    data.userId = user.id;
    data.nickname = user.nickname;
    data.manners = user.manners;
    data.point = user.point;
    data.profileImageURL = user.profileImageURL;
    data.address = address;

    return data;
  },
};

export default UserService;
