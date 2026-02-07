import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground">
      <h1 className="text-4xl font-bold tracking-tight mb-4 text-primary">
        Performance Coach
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        High-Performance Coaching Dashboard
      </p>
      <div className="flex gap-4">
        <Link href="/dashboard" className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition">
          Client Dashboard
        </Link>
        <Link href="/admin" className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:opacity-90 transition">
          Admin Dashboard
        </Link>
      </div>
    </main>
  );
}
