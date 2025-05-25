import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
const wss = new WebSocketServer({ port: 8000 });
import { prismaClient } from "@repo/database/client";

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}
const users: User[] = []; //

function checkUser(token: string): string | null {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (typeof decodedToken === "string") {
      return null;
    }
    if (!decodedToken.userId || !decodedToken) {
      return null;
    }
    return decodedToken.userId;
  } catch (error) {
    console.error(error);
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);
  if (userId === null) {
    ws.close();
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async function message(data) {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
    }
    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }
    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x === parsedData.room);
    }
    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      await prismaClient.chat.create({
        data: {
          roomId  : Number(roomId),
          message,
          userId,
        },
      });
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            })
          );
        }
      });
    }
  });
});
