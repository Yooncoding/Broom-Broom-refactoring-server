import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import ChatController from "../controllers/chat";
import { ChatValidator } from "../middlewares/validators/chat/validation";
import { messageImageUpoad } from "../middlewares/multer";

const router = Router();

function chatRouter(root) {
  root.use("/chat", router);

  router.use(auth.isAuthenticated);
  router.get("/rooms", ChatController.getRooms); // 채팅방 목록 조회
  router.get("/rooms/:roomId", ChatController.getRoom); // 채팅방 채팅내용 조회
  router.post("/rooms/:roomId/message", ChatValidator.postMessage, ChatController.postMessage); // 채팅 메세지 저장
  router.post("/rooms/:roomId/image", messageImageUpoad.single("image"), ChatController.postImage); // 채팅 이미지 저장
  router.put("/rooms/:roomId/status/:postId", ChatController.putStatus); // 게시글 상태 조정
  router.post("/room/:postId", ChatController.postRoom); // 채팅방 생성
}

export default chatRouter;
