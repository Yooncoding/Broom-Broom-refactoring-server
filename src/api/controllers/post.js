import getApi from "../../utils/response";
import PostService from "../../services/post";
import CustomError from "../../utils/errorhandle";

const PostController = {
  getPost: async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await PostService.getPost(postId);

      res.status(200).json(getApi({ suc: true, data: post }));
    } catch (err) {
      next(err);
    }
  },

  deletePost: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { postId } = req.params;
      await PostService.deletePost(id, postId);

      res.status(200).json(getApi({ suc: true, mes: "삭제 완료" }));
    } catch (err) {
      next(err);
    }
  },

  getEdit: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { postId } = req.params;
      const post = await PostService.getEdit(id, postId);

      res.status(200).json(getApi({ suc: true, data: post }));
    } catch (err) {
      next(err);
    }
  },

  postPost: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { title, content, price, deadline } = req.body;
      const files = req.files;
      if (files.length === 0) throw new CustomError("EXIST_NOT_IMAGES", 400, "상품 사진을 등록해주세요.");
      const images = files.map((file) => file.location);
      await PostService.postPost(id, title, content, price, deadline, images);

      res.status(201).json(getApi({ suc: true }));
    } catch (err) {
      next(err);
    }
  },

  postEdit: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { postId } = req.params;
      const { title, content, price, deadline } = req.body;
      const files = req.files;
      if (files.length === 0) throw new CustomError("EXIST_NOT_IMAGES", 400, "상품 사진을 등록해주세요.");
      const images = files.map((file) => file.location);
      await PostService.postEdit(id, postId, title, content, price, deadline, images);

      res.status(201).json(getApi({ suc: true }));
    } catch (err) {
      next(err);
    }
  },

  getSearch: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { q } = req.query;
      const order = req.query.order ? req.query.order : "date";
      const page = req.query.page ? req.query.page : 1;
      const filter = req.query.filter ? req.query.filter : "false";
      const posts = await PostService.getSearch(id, q, order, filter, page);

      res.status(200).json(getApi({ suc: true, data: posts }));
    } catch (err) {
      next(err);
    }
  },
};

export default PostController;
