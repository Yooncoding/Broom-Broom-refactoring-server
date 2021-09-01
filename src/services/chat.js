import ChatRoom from "../models/ChatRoom";
import ChatMessage from "../models/ChatMessage";
import Post from "../models/Post";
import Sequelize from "sequelize";
import User from "../models/User";

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
};

export default ChatService;
