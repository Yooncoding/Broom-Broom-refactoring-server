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

  getRoom: async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const room = await ChatService.getRoom(roomId);

      res.status(200).json(getApi({ suc: true, data: room }));
    } catch (err) {
      next(err);
    }
  },

  postRoom: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { postId } = req.params;
      const room = await ChatService.postRoom(id, postId);

      res.status(201).json(getApi({ suc: true, data: room }));
    } catch (err) {
      next(err);
    }
  },

  postMessage: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { roomId } = req.params;
      const { content } = req.body;
      const message = await ChatService.postMessage(id, roomId, content);

      res.status(201).json(getApi({ suc: true, data: message }));
    } catch (err) {
      next(err);
    }
  },

  postImage: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { roomId } = req.params;
      const image = req.file.location;

      const message = await ChatService.postImage(id, roomId, image);
      res.status(201).json(getApi({ suc: true, data: message }));
    } catch (err) {
      next(err);
    }
  },

  putStatus: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { roomId, postId } = req.params;
      const { type } = req.query;

      const message = await ChatService.putStatus(id, roomId, postId, type);
      res.status(200).json(getApi({ suc: true, data: message }));
    } catch (err) {
      next(err);
    }
  },
};

export default ChatController;
