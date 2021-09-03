import socketIo from "socket.io";
import ChatRoom from "../../models/ChatRoom";
import Post from "../../models/Post";
import User from "../../models/User";

const runSocket = (server) => {
  const io = socketIo(server);
  io.on("connection", (socket) => {
    disconnect(socket);
    joinUser(socket);
    joinRoom(socket);
    message(socket, io);
    leaveUser(socket);
    leaveRoom(socket);
  });
};

const disconnect = (socket) => {
  socket.on("disconnect", () => {
    console.log("disconnect socket");
  });
};

const joinUser = (socket) => {
  // 채팅방 목록
  socket.on("joinUser", (userId) => {
    userId = userId.toString();
    socket.join(userId);
  });
};

const joinRoom = (socket) => {
  // 채팅방 채팅
  socket.on("joinRoom", (roomId) => {
    roomId = roomId.toString();
    socket.join(roomId);
  });
};

const leaveUser = (socket) => {
  socket.on("leaveUser", (userId) => {
    userId = userId.toString();
    socket.leave(userId);
  });
};

const leaveRoom = (socket) => {
  socket.on("leaveRoom", (roomId) => {
    roomId = roomId.toString();
    socket.leave(roomId);
  });
};

const message = (socket, io) => {
  socket.on("message", async (messageData) => {
    const { id, content, messageImageURL, senderId, roomId, createdAt } = messageData;
    const room = await ChatRoom.findOne({ where: { id: roomId }, include: [{ model: Post, attributes: ["id", "title"] }] });
    const user = await User.findOne({ where: { id: senderId }, attributes: ["id", "nickname", "profileImageURL"] });

    let roomData = {};
    roomData.chatRoomId = room.id;
    roomData.lastChat = room.lastChat;
    roomData.updatedAt = room.updatedAt;
    roomData.Post = room.Post;
    roomData.User = user;

    const stringRoomId = messageData.roomId.toString();
    const stringUserId = messageData.senderId.toString();

    io.to(stringRoomId).emit("message", messageData); // senderId가 null이면 SYSTEM message
    io.to(stringUserId).emit("message", roomData); // 기존에 없던 채팅방이면 맨위 단순추가, 만약 있던 채팅방이면 기존 채팅방 지우고 맨위 추가
  });
};

export default runSocket;
