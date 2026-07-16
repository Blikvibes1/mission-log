"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Apod } from "@/lib/types";

export default function FavoriteButton({
  apod,
  userId,
}: {
  apod: Apod;
  userId: string | null;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    supabase
      .from("favorites")
      .select("id")
      .eq("user_id", userId)
      .eq("apod_date", apod.date)
      .maybeSingle()
      .then(({ data }) => setFavoriteId(data?.id ?? null));
  }, [userId, apod.date]);

  if (!userId) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="shrink-0 text-xs font-mono border border-space-line px-3 py-2 rounded text-ink-muted hover:border-gold hover:text-gold transition-colors"
      >
        sign in to save
      </button>
    );
  }

  async function toggle() {
    setLoading(true);
    if (favoriteId) {
      await supabase.from("favorites").delete().eq("id", favoriteId);
      setFavoriteId(null);
    } else {
      const { data } = await supabase
        .from("favorites")
        .insert({
          user_id: userId,
          apod_date: apod.date,
          title: apod.title,
          image_url: apod.url,
        })
        .select("id")
        .single();
      setFavoriteId(data?.id ?? null);
    }
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`shrink-0 text-xs font-mono border px-3 py-2 rounded transition-colors ${
        favoriteId
          ? "border-gold text-gold"
          : "border-space-line text-ink-muted hover:border-gold hover:text-gold"
      }`}
    >
      {favoriteId ? "★ saved" : "☆ save"}
    </button>
  );
}
