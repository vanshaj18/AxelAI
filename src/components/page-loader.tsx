
'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function Loader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);
  
  // A simple way to detect navigation start.
  // We use a state that is true by default and set to false when the new page is rendered.
  // The key prop on Suspense helps re-trigger this.
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 750); // Fallback to hide loader
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);


  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}


export function PageLoader() {
  return (
    <Suspense>
      <Loader />
    </Suspense>
  )
}
