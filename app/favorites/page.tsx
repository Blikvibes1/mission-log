import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Favorite } from "@/lib/types";

export default async function FavoritesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="font-mono text-xs text-gold mb-2">RESTRICTED</p>
        <h1 className="font-display font-bold text-2xl mb-4">
          Sign in to view your manifest
        </h1>
        <Link
          href="/login"
          className="inline-block text-sm font-mono border border-gold-dim text-gold px-4 py-2 rounded hover:bg-gold hover:text-space transition-colors"
        >
          sign in
        </Link>
      </div>
    );
  }

  const { data: favorites } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .order("apod_date", { ascending: false });

  const list = (favorites ?? []) as Favorite[];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <p className="font-mono text-xs text-gold mb-1">MANIFEST</p>
      <h1 className="font-display font-bold text-2xl md:text-3xl mb-8">
        Your saved log entries
      </h1>

      {list.length === 0 ? (
        <p className="text-ink-muted font-mono text-sm">
          Nothing saved yet. Find something worth keeping in the{" "}
          <Link href="/archive" className="text-gold hover:text-ink">
            archive
          </Link>
          .
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {list.map((f) => (
            <Link
              key={f.id}
              href={`/archive/${f.apod_date}`}
              className="group block border border-space-line rounded overflow-hidden hover:border-gold-dim transition-colors"
            >
              <div className="aspect-square bg-space-panel overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.image_url}
                  alt={f.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <p className="font-mono text-[10px] text-gold">{f.apod_date}</p>
                <p className="text-sm text-ink line-clamp-2 mt-1">{f.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
