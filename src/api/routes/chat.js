import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import ChatController from "../controllers/chat";

const router = Router();

function chatRouter(root) {
  root.use("/chat", router);

  router.use(auth.isAuthenticated);
  router.get("/rooms", ChatController.getRooms); // 채팅방 목록 조회
  router.get("/rooms/:roomId"); // 채팅방 채팅내용 조회
  router.post("/rooms/:roomId/message"); // 채팅 메세지 저장
  router.post("/rooms/:roomId/image"); // 채팅 이미지 저장
  router.put("/rooms/:roomId/status"); // 게시글 상태 조정
  router.post("/room/:postId"); // 채팅방 생성
}

export default chatRouter;
