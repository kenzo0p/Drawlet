"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSockets";

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: string[];
  id: string;
}) {
  const [chats, setChats] = useState<string[]>(messages);
  const [currentMessage, setCurrentMessage] = useState<string>();
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          setChats((c) => [...c, parsedData.message]);
        }
      };
    }
   
  }, [socket, loading , id]);

  return (
    <div>
      {chats.map((msg, idx) => (
        <div key={idx}>{msg}</div>
      ))}
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "chat",
              roomId: id,
              message: currentMessage,
            })
          );
          setCurrentMessage("");
        }}
      ></button>
    </div>
  );
}
