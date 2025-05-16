import {Router} from "express"
import { createRoom, getAllRoomChats, signin, signup } from "../controllers/users.controller";
import { middleware } from "../middlewares/middleware";

const userRouter : Router = Router();

userRouter.route("/signup").post(signup)
userRouter.route("/signin").post(signin)
userRouter.route("/room").post(middleware , createRoom)
userRouter.route("/room").get(middleware , getAllRoomChats)

export default userRouter;