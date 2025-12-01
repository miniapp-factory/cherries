"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const CHERRY_SIZE = 40;
const BASKET_WIDTH = 80;
const BASKET_HEIGHT = 20;
const GRAVITY = 2;
const SPEED = 5;

export default function CherryGame() {
  const [cherryY, setCherryY] = useState(-CHERRY_SIZE);
  const [cherryX, setCherryX] = useState(
    Math.random() * (window.innerWidth - CHERRY_SIZE)
  );
  const [basketX, setBasketX] = useState(
    window.innerWidth / 2 - BASKET_WIDTH / 2
  );
  const [caught, setCaught] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setBasketX((prev) => Math.max(prev - SPEED, 0));
      } else if (e.key === "ArrowRight") {
        setBasketX((prev) =>
          Math.min(prev + SPEED, window.innerWidth - BASKET_WIDTH)
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCherryY((prev) => prev + GRAVITY);
    }, 30);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (cherryY > window.innerHeight) {
      setCherryY(-CHERRY_SIZE);
      setCherryX(Math.random() * (window.innerWidth - CHERRY_SIZE));
    } else if (
      cherryY + CHERRY_SIZE >= window.innerHeight - BASKET_HEIGHT &&
      cherryX + CHERRY_SIZE >= basketX &&
      cherryX <= basketX + BASKET_WIDTH
    ) {
      setCaught((prev) => prev + 1);
      setCherryY(-CHERRY_SIZE);
      setCherryX(Math.random() * (window.innerWidth - CHERRY_SIZE));
    }
  }, [cherryY, cherryX, basketX]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-pink-200 to-pink-400">
      <div
        className="absolute"
        style={{
          left: `${cherryX}px`,
          top: `${cherryY}px`,
          width: `${CHERRY_SIZE}px`,
          height: `${CHERRY_SIZE}px`,
          fontSize: `${CHERRY_SIZE}px`,
          textAlign: "center",
        }}
      >
        🍒
      </div>
      <div
        className="absolute"
        style={{
          left: `${basketX}px`,
          top: `${window.innerHeight - BASKET_HEIGHT - 10}px`,
          width: `${BASKET_WIDTH}px`,
          height: `${BASKET_HEIGHT}px`,
          backgroundColor: "#8B4513",
          borderRadius: "10px",
        }}
      />
      <div className="absolute top-4 left-4 text-lg">
        Caught: {caught}
      </div>
    </div>
  );
}
