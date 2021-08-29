import getApi from "../../utils/response";
import PostService from "../../services/post";

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
};

export default PostController;
