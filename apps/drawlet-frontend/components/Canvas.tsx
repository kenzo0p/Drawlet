import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { LineButton } from "./Icons";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "rect" | "pencil";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: number;
  socket: WebSocket;
}) {
  const [selectedTool, setSelectedTool] = useState<Tool>("circle");
  const [game, setGame] = useState<Game>();
  useEffect(() => {
    game?.setTool(selectedTool);
  }, [selectedTool, game]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);
      return () => {
        g.destroy()
      }
    }


  }, [canvasRef]);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  );
}

function Topbar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: 10,
      }}
    >
      <div className="flex gap-2">
        <LineButton
          activated={selectedTool === "pencil"}
          icon={<Pencil />}
          onClick={() => setSelectedTool("pencil")}
        ></LineButton>
        <LineButton
          activated={selectedTool === "rect"}
          icon={<RectangleHorizontalIcon />}
          onClick={() => setSelectedTool("rect")}
        ></LineButton>
        <LineButton
          activated={selectedTool === "circle"}
          icon={<Circle />}
          onClick={() => setSelectedTool("circle")}
        ></LineButton>
      </div>
    </div>
  );
}
