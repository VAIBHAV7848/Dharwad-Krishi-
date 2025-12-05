'use client';

import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useUserStore } from '@/lib/store';
import { useState, useRef, useEffect } from "react";

export function LanguageSwitcher() {
    const { language, setLanguage } = useUserStore();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
        { code: 'hi', label: 'हिंदी (Hindi)' }
    ];

    return (
        <div className="relative" ref={ref}>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                title="Change Language"
            >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change Language</span>
            </Button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg py-1 z-50">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLanguage(lang.code as any);
                                setIsOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted ${language === lang.code ? 'font-bold text-primary' : ''
                                }`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
