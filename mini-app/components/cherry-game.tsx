"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CherryGame() {
  const [caught, setCaught] = useState<number[]>([]);
  const cherries = Array.from({ length: 9 }, (_, i) => i);

  const handleCatch = (id: number) => {
    if (!caught.includes(id)) {
      setCaught((prev) => [...prev, id]);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-4">
        {cherries.map((id) => (
          <Button
            key={id}
            variant="outline"
            size="lg"
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center",
              caught.includes(id) && "bg-red-500 text-white",
              !caught.includes(id) && "bg-white text-red-500"
            )}
            onClick={() => handleCatch(id)}
          >
            <span
              className={cn(
                "text-2xl",
                caught.includes(id) && "animate-spin"
              )}
            >
              🍒
            </span>
          </Button>
        ))}
      </div>
      <div className="text-lg">
        Caught: {caught.length} / {cherries.length}
      </div>
    </div>
  );
}
