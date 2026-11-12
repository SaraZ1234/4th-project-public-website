"use client";
import { useState } from "react";
/* Plain <img> with a neutral placeholder if the file is missing (spec §27). Give wrappers an aspect ratio to avoid layout shift. */
export default function Img({ src, alt, className = "", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div role="img" aria-label={alt} className={`bg-surface ${className}`} />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" onError={() => setBad(true)} className={`object-cover ${className}`} />;
}