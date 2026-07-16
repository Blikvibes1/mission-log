import { Apod } from "@/lib/types";
import FavoriteButton from "@/components/FavoriteButton";

function formatDate(d: string) {
  const date = new Date(d + "T00:00:00");
  return date
    .toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })
    .toUpperCase();
}

export default function ApodHero({ apod, userId }: { apod: Apod; userId: string | null }) {
  return (
    <section className="relative border-b border-space-line">
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-space-panel">
        {apod.media_type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={apod.url}
            alt={apod.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <iframe
            src={apod.url}
            title={apod.title}
            className="w-full h-full"
            allow="encrypted-media"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-space via-space/10 to-transparent" />

        {/* Signature element: telemetry strip */}
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 py-3 md:py-4 telemetry-strip text-[11px] md:text-xs text-gold flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-gold-dim/40 bg-space/40 backdrop-blur-sm">
          <span className="telemetry-cursor">LOG {formatDate(apod.date)}</span>
          <span className="text-ink-muted">SRC api.nasa.gov/planetary/apod</span>
          <span className="text-ink-muted">
            FEED {apod.media_type === "image" ? "IMG" : "VID"}
          </span>
          {apod.copyright && (
            <span className="text-ink-muted truncate">© {apod.copyright.trim()}</span>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-start justify-between gap-4">
          <h1 className="font-display font-bold text-2xl md:text-4xl leading-tight text-ink">
            {apod.title}
          </h1>
          <FavoriteButton apod={apod} userId={userId} />
        </div>
        <p className="mt-4 text-ink-muted leading-relaxed max-w-3xl">
          {apod.explanation}
        </p>
        {apod.hdurl && apod.media_type === "image" && (
          <a
            href={apod.hdurl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 text-sm font-mono text-signal hover:text-ink transition-colors"
          >
            view full resolution →
          </a>
        )}
      </div>
    </section>
  );
}
