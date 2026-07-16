"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <p className="font-mono text-xs text-gold mb-2">CREW ACCESS</p>
      <h1 className="font-display font-bold text-2xl mb-6">Sign in</h1>

      {status === "sent" ? (
        <p className="text-ink-muted text-sm">
          Check <span className="text-ink">{email}</span> for a sign-in link.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-space-panel border border-space-line rounded px-3 py-2 text-sm font-mono text-ink focus-visible:outline-gold"
          />
          <button
            type="submit"
            className="w-full text-sm font-mono border border-gold-dim text-gold px-3 py-2 rounded hover:bg-gold hover:text-space transition-colors"
          >
            send magic link
          </button>
          {status === "error" && (
            <p className="text-red-400 text-xs font-mono">
              Something went wrong. Try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
