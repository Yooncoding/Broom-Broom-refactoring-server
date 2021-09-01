import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import ChatController from "../controllers/chat";
import { ChatValidator } from "../middlewares/validators/chat/validation";
import { messageImageUpoad } from "../middlewares/multer";

const router = Router();

function chatRouter(root) {
  root.use("/chat", router);

  router.use(auth.isAuthenticated);
  router.get("/rooms", ChatController.getRooms);
  router.get("/rooms/:roomId", ChatController.getRoom);
  router.post("/rooms/:roomId/message", ChatValidator.postMessage, ChatController.postMessage);
  router.post("/rooms/:roomId/image", messageImageUpoad.single("image"), ChatController.postImage);
  router.put("/rooms/:roomId/status/:postId", ChatController.putStatus);
  router.post("/room/:postId", ChatValidator.putStatus, ChatController.postRoom);
}

export default chatRouter;
