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
};

export default ChatService;
