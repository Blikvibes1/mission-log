import { notFound } from "next/navigation";
import ApodHero from "@/components/ApodHero";
import { createClient } from "@/lib/supabase/server";
import { Apod } from "@/lib/types";

async function getApodByDate(date: string): Promise<Apod | null> {
  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function ArchiveDatePage({
  params,
}: {
  params: { date: string };
}) {
  const apod = await getApodByDate(params.date);
  if (!apod) notFound();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="starfield">
      <ApodHero apod={apod} userId={user?.id ?? null} />
    </div>
  );
}
