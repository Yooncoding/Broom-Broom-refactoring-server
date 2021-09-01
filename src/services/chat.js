import ChatRoom from "../models/ChatRoom";
import ChatMessage from "../models/ChatMessage";
import Post from "../models/Post";
import Sequelize from "sequelize";
import User from "../models/User";
import CustomError from "../utils/errorhandle";

const ChatService = {
  getRooms: async (userId) => {
    const Op = Sequelize.Op;

    const rooms = await ChatRoom.findAll({
      where: { [Op.or]: [{ setterId: userId }, { getterId: userId }] },
      include: [{ model: Post, attributes: ["id", "title"] }],
      order: [["updatedAt", "DESC"]],
    });

    let roomsList = [];
    for (const room of rooms) {
      roomsList.push({
        chatRoomId: room.id,
        lastChat: room.lastChat,
        updatedAt: room.updatedAt,
        Post: room.Post,
        User: await User.findOne({
          where: { id: room.setterId === userId ? room.getterId : room.setterId },
          attributes: ["id", "nickname", "profileImageURL"],
        }),
      });
    }

    return roomsList;
  },

  getRoom: async (roomId) => {
    const messages = await ChatMessage.findAll({
      where: { roomId },
      include: [{ model: User, attributes: ["id", "nickname", "profileImageURL"] }],
      attributes: ["id", "content", "messageImageURL", "createdAt", "senderId"],
    });

    const room = await ChatRoom.findOne({
      where: { id: roomId },
      include: { model: Post, attributes: ["id", "title", "status", "deadline"] },
      attributes: ["id", "postId", "setterId", "getterId"],
    });

    let data = {};
    data.room = room;
    data.messages = messages;

    return data;
  },

  postRoom: async (userId, postId) => {
    const post = await Post.findOne({ where: { id: postId }, attributes: ["id", "sellerId"] });
    if (post.sellerId === userId) throw new CustomError("", 400, "본인이 게시한 심부름은 채팅방 개설이 불가능합니다.");

    const room = await ChatRoom.findOne({ where: { postId, setterId: userId } });
    if (!room) return await ChatRoom.create({ postId, setterId: userId, getterId: post.sellerId });

    return room;
  },

  postMessage: async (userId, roomId, content) => {
    const message = await ChatMessage.create({ content, senderId: userId, roomId });
    await ChatRoom.update({ lastChat: message.content }, { where: { id: roomId } });

    return message;
  },

  postImage: async (userId, roomId, image) => {
    const message = await ChatMessage.create({ messageImageURL: image, senderId: userId, roomId });
    await ChatRoom.update({ lastChat: message.content }, { where: { id: roomId } });

    return message;
  },

  putStatus: async (userId, roomId, postId, type) => {
    const room = await ChatRoom.findOne({ where: { id: roomId } });
    const post = await Post.findOne({ where: { id: postId } });
    const user = await User.findOne({ where: { id: userId } });

    let typeTarget = "";
    if (type === "contract") {
      typeTarget = "start";
      if (post.status !== "basic") throw new CustomError("", 400, "심부름이 약속확정이 불가능한 상태입니다.");
      if (post.sellerId !== userId) throw new CustomError("", 400, "글 작성자만 약속확정이 가능합니다.");
      if (post.price > user.point) throw new CustomError("", 400, "소지하신 포인트가 부족하여 약속확정이 불가능합니다.");

      await Post.update({ status: typeTarget, buyerId: room.setterId }, { where: { id: postId } });
      await User.update({ point: user.point - post.price }, { where: { id: userId } });
      const message = await ChatMessage.create({ content: `[SYSTEM] 심부름 진행상태로 변경되었습니다.`, roomId });
      await ChatRoom.update({ lastChat: message.content }, { where: { id: roomId } });

      return message;
    }

    if (type === "reward") {
      typeTarget = "end";
      if (post.status !== "start" && post.status !== "stop") throw new CustomError("", 400, "심부름이 보상지급이 불가능한 상태입니다.");
      if (post.sellerId !== userId) throw new CustomError("", 400, "글 작성자만 보상지급이 가능합니다.");

      const buyer = await User.findOne({ where: { id: post.buyerId } });
      await Post.update({ status: typeTarget }, { where: { id: postId } });
      await User.update({ point: buyer.point + post.price }, { where: { id: buyer.id } });
      const message = await ChatMessage.create({ content: `[SYSTEM] 심부름 완료상태로 변경되었습니다.`, roomId });
      await ChatRoom.update({ lastChat: message.content }, { where: { id: roomId } });

      return message;
    }

    if (type === "hold") {
      typeTarget = "stop";
      if (post.status !== "start") throw new CustomError("", 400, "심부름이 지급보류가 불가능한 상태입니다.");
      if (post.sellerId !== userId) throw new CustomError("", 400, "글 작성자만 지급보류가 가능합니다.");

      await Post.update({ status: typeTarget }, { where: { id: postId } });
      const message = await ChatMessage.create({ content: `[SYSTEM] 심부름 보류상태로 변경되었습니다.`, roomId });
      await ChatRoom.update({ lastChat: message.content }, { where: { id: roomId } });

      return message;
    }
  },
};

export default ChatService;
