
'use client';

import { useState, useEffect, Suspense, createContext } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { usePageLoader as usePageLoaderHook } from '@/hooks/use-page-loader';


export const PageLoaderContext = createContext<{
    isLoading: boolean;
    showLoader: () => void;
}>({
  isLoading: false,
  showLoader: () => {},
});

function PageLoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const showLoader = () => setIsLoading(true);

  return (
    <PageLoaderContext.Provider value={{ isLoading, showLoader }}>
      {children}
    </PageLoaderContext.Provider>
  );
}


function Loader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoading } = usePageLoaderHook();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    if(isLoading) {
      setIsVisible(true);
    }
  }, [isLoading]);

  if (!isVisible) return null;

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
      <PageLoaderProvider>
        <Loader />
      </PageLoaderProvider>
    </Suspense>
  )
}

export function PageLoaderRoot({children}: {children: React.ReactNode}) {
   return (
    <Suspense>
      <PageLoaderProvider>
        {children}
         <Loader />
      </PageLoaderProvider>
    </Suspense>
  )
}
