import Link from "next/link";
import { Apod } from "@/lib/types";

export default function ApodGridCard({ apod }: { apod: Apod }) {
  return (
    <Link
      href={`/archive/${apod.date}`}
      className="group block border border-space-line rounded overflow-hidden hover:border-gold-dim transition-colors"
    >
      <div className="aspect-square bg-space-panel overflow-hidden">
        {apod.media_type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={apod.url}
            alt={apod.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-faint font-mono text-xs">
            VIDEO FEED
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="font-mono text-[10px] text-gold">{apod.date}</p>
        <p className="text-sm text-ink line-clamp-2 mt-1">{apod.title}</p>
      </div>
    </Link>
  );
}
