"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DateJump() {
  const router = useRouter();
  const [date, setDate] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (date) router.push(`/archive/${date}`);
      }}
      className="flex items-center gap-2"
    >
      <input
        type="date"
        value={date}
        min="1995-06-16"
        max={new Date().toISOString().slice(0, 10)}
        onChange={(e) => setDate(e.target.value)}
        className="bg-space-panel border border-space-line rounded px-3 py-2 text-sm font-mono text-ink focus-visible:outline-gold"
      />
      <button
        type="submit"
        className="text-xs font-mono border border-gold-dim text-gold px-3 py-2 rounded hover:bg-gold hover:text-space transition-colors"
      >
        jump
      </button>
    </form>
  );
}
