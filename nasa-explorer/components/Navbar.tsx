import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/SignOutButton";

export default async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-space-line">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-gold group-hover:animate-pulse" />
          <span className="font-display font-bold tracking-tight text-lg">
            Mission Log
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-mono text-ink-muted">
          <Link href="/archive" className="hover:text-ink transition-colors">
            archive
          </Link>
          <Link href="/favorites" className="hover:text-ink transition-colors">
            favorites
          </Link>
          {user ? (
            <SignOutButton />
          ) : (
            <Link
              href="/login"
              className="text-gold hover:text-ink transition-colors"
            >
              sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
