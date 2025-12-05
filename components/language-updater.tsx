'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/lib/store';

export function LanguageUpdater() {
    const language = useUserStore((state) => state.language);

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return null;
}
