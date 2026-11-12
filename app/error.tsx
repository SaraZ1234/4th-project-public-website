"use client";
import { Button } from "@/components/ui";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (<div className="section"><div className="container-x text-center"><h1>Something went wrong</h1><p className="mx-auto mt-4 max-w-md text-muted">This is a temporary problem on our side. Try again, or return to the home page.</p>
    <div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={reset} className="min-h-12 rounded-lg bg-amber px-6 font-semibold text-navy hover:bg-amber-hover">Try again</button><Button href="/" variant="secondary">Go to Home</Button></div></div></div>);
}
