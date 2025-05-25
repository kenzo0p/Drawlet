import { HTTP_BACKEND } from "@/config";
import axios from "axios";
type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: number,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");
  let existingShapes: Shape[] = await getExistingShapes(roomId);
  console.log( "Here we go" , existingShapes)

  if (!ctx) {
    return;
  }

  socket.onmessage = (e) => {
    const message = JSON.parse(e.data);
    if (message.data === "chat") {
      const parsedShape = JSON.parse(message.message);
      existingShapes.push(parsedShape.shape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  };
  clearCanvas(existingShapes, canvas, ctx);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let clicked = false;
  let startX = 0;
  let startY = 0;
  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    const shape: Shape = {
      type: "rect",
      x: startX,
      y: startY,
      height,
      width,
    };
    existingShapes.push(shape);
    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shape }),
        roomId,
      })
    );
  });
  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const widht = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(existingShapes, canvas, ctx);
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(startX, startY, widht, height);
    }
  });
}

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getExistingShapes(roomId: number) {
   try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZDIzYWY3OS04ZDg3LTQ3NWMtOGYyMC0yYWIxNzM5ODUyZmEiLCJpYXQiOjE3NDgxMzI2NzN9.ppyHrUU1askUXhf-fnzz876i6Jyx43hWE3TclSDAoP0";

    const res = await axios.get(`${HTTP_BACKEND}/users/chats/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!Array.isArray(res.data.messages)) {
      console.error("Messages is not an array:", res.data);
      return [];
    }

    const shapes = res.data.messages.map((x: { message: string }) => {
      try {
        // Parse the stringified message
        const parsed = JSON.parse(x.message);
        // Return the shape object
        return parsed.shape;
      } catch (e) {
        console.error("Failed to parse message:", e, x.message);
        return null;
      }
    }).filter(Boolean); // Remove any null values

    console.log("Parsed shapes:", shapes);
    return shapes;
  } catch (error) {
    console.error("Error fetching shapes:", error);
    return [];
  }
}
