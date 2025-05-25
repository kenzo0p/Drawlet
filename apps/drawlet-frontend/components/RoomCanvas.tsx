"use client";

import { useEffect,  useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: number }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwZDIzYWY3OS04ZDg3LTQ3NWMtOGYyMC0yYWIxNzM5ODUyZmEiLCJpYXQiOjE3NDgxMzI2NzN9.ppyHrUU1askUXhf-fnzz876i6Jyx43hWE3TclSDAoP0
`);
    ws.onopen = () => {
      setSocket(ws);
      ws.send(JSON.stringify({ type: "join_room", roomId }));
    };
  }, []);

  if (!socket) {
    return <div>Connecting the server.........</div>;
  }
  return (
    <>
      <Canvas roomId={roomId} socket={socket} />
    </>
  );
}
