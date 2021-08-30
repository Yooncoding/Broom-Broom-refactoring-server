import Post from "../models/Post";
import PostImage from "../models/PostImage";
import District from "../models/District";
import User from "../models/User";
import UserAddress from "../models/UserAddress";
import CustomError from "../utils/errorhandle";
import Sequelize from "sequelize";

const PostService = {
  getUserPosts: async (userId, order, tab) => {
    let orderTarget = "createdAt";
    let orderMethod = "desc";
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

    let tabTarget = "basic";
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

  getMainPosts: async (userId, page) => {
    const Op = Sequelize.Op;

    const PAGE_SIZE = 20; // 20개씩 pagination
    const offset = (page - 1) * PAGE_SIZE;

    const address = await UserAddress.findOne({ where: { userId }, attributes: ["nearDistricts"] });
    const nearDistricts = address.nearDistricts.split(",");
    const posts = await Post.findAll({
      where: { districtId: { [Op.in]: nearDistricts } },
      include: [
        { model: District, attributes: ["simpleName"] },
        { model: PostImage, attributes: ["postImagesURL"] },
      ],
      order: [["createdAt", "desc"]],
      offset: offset,
      limit: PAGE_SIZE,
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

  deletePost: async (userId, postId) => {
    const post = await Post.findByPk(postId);
    if (post.sellerId !== userId) throw new CustomError("NOT_SELLER", 403, "작성자만 삭제가 가능합니다.");
    if (post.status !== "basic") throw new CustomError("EDIT_IS_IMPOSSIBLE", 400, "심부름의 상태가 삭제할 수 없는 상태입니다.");

    return await Post.destroy({ where: { id: postId } });
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

  postPost: async (userId, title, content, price, deadline, images) => {
    images = images.toString(); // 이미지 url을 배열이아닌 문자열타입으로 받기 위해 변환
    const address = await UserAddress.findOne({ where: { userId } });

    return await Post.create(
      {
        title,
        content,
        price,
        deadline,
        sellerId: userId,
        districtId: address.districtId,
        PostImage: { postImagesURL: images },
      },
      { include: { model: PostImage } }
    );
  },

  postEdit: async (userId, postId, title, content, price, deadline, images) => {
    images = images.toString(); // 이미지 url을 배열이아닌 문자열타입으로 받기 위해 변환
    const address = await UserAddress.findOne({ where: { userId } });

    return await Post.update(
      {
        title,
        content,
        price,
        deadline,
        districtId: address.districtId,
      },
      { where: { id: postId } }
    ).then(await PostImage.update({ postImagesURL: images }, { where: { postId } }));
  },

  getSearch: async (userId, q, order, filter, page) => {
    const Op = Sequelize.Op;
    if (q) q = q.trim();
    let splitedWord = q.split(" "); // 띄어쓰기별 단어 분리
    let combinedWord = ""; // 띄어쓰기 합치기
    splitedWord.forEach((word) => {
      combinedWord += word;
    });

    const PAGE_SIZE = 20; // 20개씩 pagination
    const offset = (page - 1) * PAGE_SIZE;

    let orderTarget = "createdAt";
    let orderMethod = "desc";
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

    let filterTarget = "basic";
    if (filter === "true") filterTarget = "basic";
    if (filter === "false") filterTarget = ["basic", "start", "end", "stop", "close"];

    const address = await UserAddress.findOne({ where: { userId }, attributes: ["nearDistricts"] });
    const nearDistricts = address.nearDistricts.split(",");
    const posts = await Post.findAll({
      where: {
        districtId: { [Op.in]: nearDistricts },
        status: filterTarget,
        title: { [Op.or]: [{ [Op.like]: "%" + q + "%" }, { [Op.like]: "%" + combinedWord + "%" }, { [Op.regexp]: splitedWord.join("|") }] },
      },
      order: [[orderTarget, orderMethod]],
      include: [
        { model: District, attributes: ["simpleName"] },
        { model: PostImage, attributes: ["postImagesURL"] },
      ],
      offset: offset,
      limit: PAGE_SIZE,
    });

    return posts;
  },

  getHistoryPosts: async (userId, tab, page) => {
    const PAGE_SIZE = 20; // 20개씩 pagination
    const offset = (page - 1) * PAGE_SIZE;

    let tabTarget = "start";
    let tabUser = "sellerId";
    if (tab === "selling") tabTarget = "start";
    if (tab === "sold") tabTarget = "end";
    if (tab === "buy") {
      tabTarget = ["start", "end", "stop"];
      tabUser = "buyerId";
    }

    const posts = await Post.findAll({
      where: {
        [tabUser]: userId,
        status: tabTarget,
      },
      include: [
        { model: District, attributes: ["simpleName"] },
        { model: PostImage, attributes: ["postImagesURL"] },
      ],
      order: [["createdAt", "desc"]],
      offset: offset,
      limit: PAGE_SIZE,
    });

    return posts;
  },

  postReviewPost: async (userId, postId, review) => {
    const Op = Sequelize.Op;
    review = Number(review);

    const post = await Post.findByPk(postId);
    if (post.review) throw new CustomError("EXIST_REVIEW", 400, "이미 리뷰작성이 완료된 심부름입니다.");
    if (post.sellerId !== userId) throw new CustomError("NOT_SELLER", 403, "작성자만 리뷰작성이 가능합니다.");
    if (post.status !== "end") throw new CustomError("NOT_END_YET", 400, "아직 보상지급이 완료되지 않은 심부름입니다.");

    const buyer = await User.findOne({ where: { id: post.buyerId }, attributes: ["id", "manners"] }); // 매너점수를 포함한 구매자의 정보
    const buyCount = await Post.count({ where: { buyerId: buyer.id, review: { [Op.not]: null } } }); // 구매자의 리뷰받은 횟수
    const updateManners = ((buyer.manners * buyCount + review) / (buyCount + 1)).toFixed(2); // 새로 갱신된 리뷰점수

    return await Post.update({ review }, { where: { id: postId } }).then(await User.update({ manners: updateManners }, { where: { id: buyer.id } }));
  },
};

export default PostService;
