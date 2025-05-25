import { HTTP_BACKEND } from "@/config";
import axios from "axios";

export async function getExistingShapes(roomId: number) {
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
