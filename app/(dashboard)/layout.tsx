'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/store';
import {
    LayoutDashboard,
    CloudSun,
    Sprout,
    ShieldCheck,
    ShoppingBag,
    MessageSquare,
    LogOut,
    Menu,
    X,
    Landmark,
    BarChart3,
    Users,
    Droplets
} from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import { translations, Language } from '@/lib/translations';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { role, logout, language } = useUserStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const t = translations[language as Language];

    const farmerLinks = [
        { href: '/farmer', label: t.overview, icon: LayoutDashboard },
        { href: '/farmer/weather', label: t.weather, icon: CloudSun },
        { href: '/farmer/irrigation', label: t.irrigation, icon: Droplets },
        { href: '/farmer/crops', label: t.cropSuggestions, icon: Sprout },
        { href: '/farmer/disease', label: t.diseaseDetection, icon: ShieldCheck },
        { href: '/farmer/schemes', label: t.govtSchemes, icon: Landmark },
        { href: '/farmer/analytics', label: t.analytics, icon: BarChart3 },
        { href: '/farmer/forum', label: t.forum, icon: Users },
        { href: '/farmer/assistant', label: t.aiAssistant, icon: MessageSquare },
    ];

    const buyerLinks = [
        { href: '/buyer', label: t.overview, icon: LayoutDashboard },
        { href: '/buyer/market', label: t.marketPrices, icon: ShoppingBag },
        { href: '/buyer/listings', label: t.farmerListings, icon: Sprout },
    ];

    const links = role === 'farmer' ? farmerLinks : buyerLinks;

    return (
        <div className="min-h-screen flex bg-muted/20">
            {/* Mobile Sidebar Toggle */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Button size="icon" variant="outline" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <X /> : <Menu />}
                </Button>
            </div>

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                            <Sprout className="h-6 w-6" />
                            KrishiMitraAI
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1 capitalize">
                            {role} {t.dashboardTitle}
                        </p>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                            <LanguageSwitcher />
                            <ThemeToggle />
                        </div>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        {links.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link key={link.href} href={link.href} onClick={() => setIsSidebarOpen(false)}>
                                    <Button
                                        variant={pathname === link.href ? "secondary" : "ghost"}
                                        className="w-full justify-start gap-3"
                                    >
                                        <Icon className="h-5 w-5" />
                                        {link.label}
                                    </Button>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t">
                        <Link href="/">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => logout()}
                            >
                                <LogOut className="h-5 w-5" />
                                {t.logout}
                            </Button>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
