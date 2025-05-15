import {Router} from "express"
import { createRoom, signin, signup } from "../controllers/users.controller";
import { middleware } from "../middlewares/middleware";

const userRouter : Router = Router();

userRouter.route("/signup").post(signup)
userRouter.route("/signin").post(signin)
userRouter.route("/room").post(middleware , createRoom)

export default userRouter;