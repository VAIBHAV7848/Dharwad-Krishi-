'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Landmark, BadgeCheck } from "lucide-react";
import { SCHEMES } from "@/lib/schemes-data";
import { motion } from "framer-motion";

import { useUserStore } from '@/lib/store';
import { translations, Language } from '@/lib/translations';

export default function SchemesPage() {
    const { language } = useUserStore();
    const t = translations[language as Language];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.govtSchemesTitle}</h1>
                <p className="text-muted-foreground">{t.govtSchemesDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SCHEMES.map((scheme, index) => (
                    <motion.div
                        key={scheme.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border-primary/10">
                            <CardHeader>
                                <div className="flex justify-between items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Landmark className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="flex gap-2 flex-wrap justify-end">
                                        {scheme.tags.map(tag => (
                                            <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <CardTitle className="mt-4 text-xl">{scheme.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription className="text-base">
                                    {scheme.description}
                                </CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full gap-2" asChild>
                                    <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                                        {t.viewDetails} <ExternalLink className="h-4 w-4" />
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
