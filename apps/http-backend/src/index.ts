import express from "express"
import userRouter from "./routes/user.routes";
import cors from "cors"
const app = express();
app.use(cors())
app.use(express.json());

app.use("/users" , userRouter)
app.listen(5000);