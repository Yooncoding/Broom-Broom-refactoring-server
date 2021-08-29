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

  getPosts: async (postId) => {
    const posts = await Post.findOne({
      where: { id: postId },
      include: [
        { model: User, attributes: ["id", "nickname", "profileImageURL", "manners", "createdAt"] },
        { model: PostImage, attributes: ["postImagesURL"] },
        { model: District, attributes: ["simpleName"] },
      ],
      paranoid: false,
    });
    if (posts.deletedAt) throw new CustomError("NOT_EXIST_POST", 404, "삭제된 심부름입니다.");

    return posts;
  },
};

export default PostService;
