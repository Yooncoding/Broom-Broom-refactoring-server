import getApi from "../../utils/response";
import PostService from "../../services/post";

const PostController = {
  getPosts: async (req, res, next) => {
    try {
      const { postId } = req.params;
      const posts = await PostService.getPosts(postId);

      res.status(200).json(getApi({ suc: true, data: posts }));
    } catch (err) {
      next(err);
    }
  },
};

export default PostController;
