import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function AxelLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-lg font-bold text-primary transition-opacity hover:opacity-80",
        className
      )}
    >
      <div className="rounded-lg bg-primary/20 p-2 text-primary">
        <BrainCircuit size={20} />
      </div>
      <span className="font-headline text-xl text-white">Axel AI</span>
    </Link>
  );
}
