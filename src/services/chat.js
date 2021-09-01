import ChatRoom from "../models/ChatRoom";
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

    const roomsList = [];
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
};

export default ChatService;
