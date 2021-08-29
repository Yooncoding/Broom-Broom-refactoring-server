import Post from "../models/Post";
import PostImage from "../models/PostImage";
import District from "../models/District";
import User from "../models/User";
import CustomError from "../utils/errorhandle";

const PostService = {
  getUserPosts: async (userId, order, tab) => {
    let orderTarget = "createdAt";
    let orderMethod = "desc";
    let tabTarget = "basic";

    if (order === "date") orderTarget = "createdAt";
    if (order === "price_desc") orderTarget = "price";
    if (order === "price_asc") {
      orderTarget = "price";
      orderMethod = "asc";
    }
    if (order === "deadline") {
      orderTarget = "deadline";
      orderMethod = "asc";
    }

    if (tab === "sale") tabTarget = "basic";
    if (tab === "done") tabTarget = ["start", "end"];
    if (tab === "hold") tabTarget = ["stop", "close"];

    const posts = await Post.findAll({
      where: {
        sellerId: userId,
        status: tabTarget,
      },
      order: [[orderTarget, orderMethod]],
      include: [
        { model: District, attributes: ["simpleName"] },
        { model: PostImage, attributes: ["postImagesURL"] },
      ],
    });

    return posts;
  },

  getPost: async (postId) => {
    const post = await Post.findOne({
      where: { id: postId },
      include: [
        { model: User, attributes: ["id", "nickname", "profileImageURL", "manners", "createdAt"] },
        { model: PostImage, attributes: ["postImagesURL"] },
        { model: District, attributes: ["simpleName"] },
      ],
      paranoid: false,
    });
    if (post.deletedAt) throw new CustomError("NOT_EXIST_POST", 404, "삭제된 심부름입니다.");

    return post;
  },

  getEdit: async (userId, postId) => {
    const post = await Post.findOne({
      where: { id: postId },
      include: [
        { model: User, attributes: ["id", "nickname", "profileImageURL", "manners", "createdAt"] },
        { model: PostImage, attributes: ["postImagesURL"] },
        { model: District, attributes: ["simpleName"] },
      ],
      paranoid: false,
    });
    if (post.deletedAt) throw new CustomError("NOT_EXIST_POST", 404, "삭제된 심부름입니다.");
    if (post.sellerId !== userId) throw new CustomError("NOT_SELLER", 403, "작성자만 수정이 가능합니다.");
    if (post.status !== "basic") throw new CustomError("EDIT_IS_IMPOSSIBLE", 400, "심부름의 상태가 수정할 수 없는 상태입니다.");

    return post;
  },
};

export default PostService;
