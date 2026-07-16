import { headers } from "next/headers";
import ApodHero from "@/components/ApodHero";
import { createClient } from "@/lib/supabase/server";
import { Apod } from "@/lib/types";

async function getTodayApod(): Promise<Apod> {
  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to load today's APOD");
  return res.json();
}

export default async function HomePage() {
  const apod = await getTodayApod();
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="starfield">
      <ApodHero apod={apod} userId={user?.id ?? null} />
      <div className="max-w-5xl mx-auto px-6 py-10 flex items-center gap-4 text-sm font-mono text-ink-muted">
        <span className="w-8 h-px bg-space-line" />
        <a href="/archive" className="hover:text-gold transition-colors">
          browse the archive →
        </a>
      </div>
    </div>
  );
}
