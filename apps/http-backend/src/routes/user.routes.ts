import {Router} from "express"
import { createRoom, getAllRoomChats, getRoom, signin, signup } from "../controllers/users.controller";
import { middleware } from "../middlewares/middleware";

const userRouter : Router = Router();

userRouter.route("/signup").post(signup)
userRouter.route("/signin").post(signin)
userRouter.route("/room").post(middleware , createRoom)
userRouter.route("/chats/:roomId").get(middleware , getAllRoomChats)
userRouter.route("/room/:slug").get(middleware , getRoom)

export default userRouter;