import getApi from "../../utils/response";
import UserService from "../../services/user";

const UserController = {
  getMe: async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await UserService.getUser(id);

      res.status(200).json(getApi({ suc: true, data: user }));
    } catch (err) {
      next(err);
    }
  },

  getEdit: async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await UserService.getUser(id);

      res.status(200).json(getApi({ suc: true, data: user }));
    } catch (err) {
      next(err);
    }
  },

  getIntro: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await UserService.getUser(userId);

      res.status(200).json(getApi({ suc: true, data: user }));
    } catch (err) {
      next(err);
    }
  },

  getPoint: async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await UserService.getUser(id);
      const data = user.point;

      res.status(200).json(getApi({ suc: true, data }));
    } catch (err) {
      next(err);
    }
  },

  postEdit: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { nickname, name } = req.body;
      await UserService.postEdit(id, nickname, name);

      res.status(201).json(getApi({ suc: true }));
    } catch (err) {
      next(err);
    }
  },

  putImage: async (req, res, next) => {
    try {
      const { id } = req.user;
      const image = req.file.location;
      await UserService.putImage(id, image);

      res.status(201).json(getApi({ suc: true }));
    } catch (err) {
      next(err);
    }
  },

  deleteImage: async (req, res, next) => {
    try {
      const { id } = req.user;
      await UserService.deleteImage(id);

      res.status(200).json(getApi({ suc: true }));
    } catch (err) {
      next(err);
    }
  },

  postPoint: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { chargeAmount, refundAmount, bankName, bankAccount } = req.body;
      const { type } = req.query;
      if (type === "charge") await UserService.postPointCharge(id, type, chargeAmount);
      else if (type === "refund") await UserService.postPointRefund(id, type, refundAmount, bankName, bankAccount);

      res.status(201).json(getApi({ suc: true }));
    } catch (err) {
      next(err);
    }
  },

  getUserPosts: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const order = req.query.order ? req.query.order : "date";
      const posts = await UserService.getUserPosts(userId, order);

      res.status(200).json(getApi({ suc: true, data: posts }));
    } catch (err) {
      next(err);
    }
  },

  getMePosts: async (req, res, next) => {
    try {
      const { id } = req.user;
      const order = req.query.order ? req.query.order : "date";
      const tab = req.query.tab ? req.query.tab : "sale";
      const posts = await UserService.getMePosts(id, order, tab);

      res.status(200).json(getApi({ suc: true, data: posts }));
    } catch (err) {
      next(err);
    }
  },
};

export default UserController;
