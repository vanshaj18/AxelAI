
'use client';
import { useContext } from 'react';
import { PageLoaderContext } from '@/components/page-loader';

export const usePageLoader = () => {
    const context = useContext(PageLoaderContext);
    if(!context) {
        throw new Error('usePageLoader must be used within a PageLoaderRoot');
    }
    return context;
}
