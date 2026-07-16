import DateJump from "@/components/DateJump";
import ApodGridCard from "@/components/ApodGridCard";
import { Apod } from "@/lib/types";

function isoDaysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

async function getRange(): Promise<Apod[]> {
  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${isoDaysAgo(
    17
  )}&end_date=${isoDaysAgo(1)}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data.reverse() : [];
}

export default async function ArchivePage() {
  const entries = await getRange();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="font-mono text-xs text-gold mb-1">ARCHIVE</p>
          <h1 className="font-display font-bold text-2xl md:text-3xl">
            Flight log, by date
          </h1>
        </div>
        <DateJump />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {entries.map((apod) => (
          <ApodGridCard key={apod.date} apod={apod} />
        ))}
        {entries.length === 0 && (
          <p className="text-ink-muted font-mono text-sm col-span-full">
            Couldn&apos;t reach the archive feed right now. Try a specific date above.
          </p>
        )}
      </div>
    </div>
  );
}
