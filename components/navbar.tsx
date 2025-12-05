'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sprout, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useUserStore } from '@/lib/store';
import { translations, Language } from '@/lib/translations';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, role, logout, language, setLanguage } = useUserStore();
    const t = translations[language as Language];

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Sprout className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold text-primary">KrishiMitraAI</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/about" className="text-sm font-medium hover:text-primary">{t.about}</Link>
                    <Link href="/features" className="text-sm font-medium hover:text-primary">{t.features}</Link>
                    <Link href="/market" className="text-sm font-medium hover:text-primary">{t.market}</Link>

                    {/* Language Switcher */}
                    <div className="flex items-center gap-2 border-l pl-4 ml-4">
                        <LanguageSwitcher />
                        <ThemeToggle />
                    </div>

                    {isLoggedIn ? (
                        <>
                            <Link href={`/${role}`} className="text-sm font-medium hover:text-primary">{t.dashboard}</Link>
                            <Button onClick={() => { logout(); window.location.href = '/'; }} variant="outline">{t.logout}</Button>
                        </>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link href="/login">
                                <Button variant="ghost">{t.login}</Button>
                            </Link>
                            <Link href="/signup">
                                <Button>{t.getStarted}</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t p-4 space-y-4 bg-background">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium">Settings</span>
                        <div className="flex items-center gap-2">
                            <LanguageSwitcher />
                            <ThemeToggle />
                        </div>
                    </div>
                    <Link href="/about" className="block text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>{t.about}</Link>
                    <Link href="/features" className="block text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>{t.features}</Link>
                    <Link href="/market" className="block text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>{t.market}</Link>
                    {isLoggedIn ? (
                        <>
                            <Link href={`/${role}`} className="block text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>{t.dashboard}</Link>
                            <button onClick={() => { logout(); setIsOpen(false); window.location.href = '/'; }} className="block text-sm font-medium hover:text-primary w-full text-left">{t.logout}</button>
                        </>
                    ) : (
                        <div className="flex flex-col space-y-2 pt-4">
                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start">{t.login}</Button>
                            </Link>
                            <Link href="/signup" onClick={() => setIsOpen(false)}>
                                <Button className="w-full justify-start">{t.getStarted}</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
