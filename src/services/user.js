import User from "../models/User";
import AddressService from "./address";
import CogService from "./cog";
import CustomError from "../utils/errorhandle";
import config from "../config";

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
    const s3 = config.s3;
    const user = await User.findByPk(userId);
    const s3ImageKey = user.profileImageURL.split("com/")[1];
    const DEFAULT_PROFILE_IMAGE = "https://broombroom.s3.ap-northeast-2.amazonaws.com/broomProfile-default.png";

    if (user.profileImageURL !== DEFAULT_PROFILE_IMAGE) {
      s3.deleteObject({ Bucket: "broombroom", Key: s3ImageKey }, (err) => {
        if (err) throw err;
      });
    }

    return await User.update({ profileImageURL: image }, { where: { id: userId } });
  },

  deleteImage: async (userId) => {
    const s3 = config.s3;
    const user = await User.findByPk(userId);
    const s3ImageKey = user.profileImageURL.split("com/")[1];
    const DEFAULT_PROFILE_IMAGE = "https://broombroom.s3.ap-northeast-2.amazonaws.com/broomProfile-default.png";

    if (user.profileImageURL === DEFAULT_PROFILE_IMAGE) throw new CustomError("ALREADY_DEFAULT", 400, "이미 기본 이미지입니다");

    await User.update({ profileImageURL: DEFAULT_PROFILE_IMAGE }, { where: { id: userId } });

    return s3.deleteObject({ Bucket: "broombroom", Key: s3ImageKey }, (err) => {
      if (err) throw err;
    });
  },

  postPointRefund: async (userId, type, amount, bankName, bankAccount) => {
    const user = await User.findByPk(userId);
    if (amount > user.point) throw new CustomError("NOT_ENOUGH_POINT", 400, "환급하려는 포인트보다 보유 포인트가 부족합니다.");

    return await CogService.postCog(type, amount, userId, bankName, bankAccount);
  },

  postPointCharge: async (userId, type, amount) => {
    return await CogService.postCog(type, amount, userId);
  },
};

export default UserService;
