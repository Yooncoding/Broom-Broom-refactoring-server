import User from "../models/User";
import AddressService from "./address";
import CustomError from "../utils/errorhandle";

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

  postEdit: async (userId, nickname, name) => {
    const existNickname = await User.findOne({ where: { nickname } });
    const mutableNickname = existNickname && existNickname.id !== userId;
    if (mutableNickname) throw new CustomError("EXIST_NICKNAME", 409, "이미 존재하는 닉네임입니다.");

    return await User.update({ nickname, name }, { where: { id: userId } });
  },

  putImage: async (userId, image) => {
    return await User.update({ profileImageURL: image }, { where: { id: userId } });
  },
};

export default UserService;
