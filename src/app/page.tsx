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
        <Link href="/login" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition shadow-lg shadow-primary/20">
          Login to Dashboard
        </Link>
      </div>
    </main>
  );
}
