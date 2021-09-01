import getApi from "../../utils/response";
import ChatService from "../../services/chat";

const ChatController = {
  getRooms: async (req, res, next) => {
    try {
      const { id } = req.user;
      const rooms = await ChatService.getRooms(id);

      res.status(200).json(getApi({ suc: true, data: rooms }));
    } catch (err) {
      next(err);
    }
  },
};

export default ChatController;
