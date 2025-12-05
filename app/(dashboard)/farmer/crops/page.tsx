'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, Droplets, Sun, Thermometer } from "lucide-react";
import { toast } from 'react-hot-toast';
import { useUserStore } from '@/lib/store';
import { translations, Language } from '@/lib/translations';

export default function CropSuggestionsPage() {
    const { language } = useUserStore();
    const t = translations[language as Language];
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<any[] | null>(null);

    const handleAnalyze = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock AI Analysis
        setTimeout(() => {
            setSuggestions([
                {
                    name: 'Wheat (HD 2967)',
                    confidence: '95%',
                    duration: '120-130 days',
                    water: 'Medium',
                    profit: '₹25,000/acre',
                    reason: 'Suitable for current temperature (20-25°C) and clay-loam soil.'
                },
                {
                    name: 'Mustard (Pusa Bold)',
                    confidence: '88%',
                    duration: '110-120 days',
                    water: 'Low',
                    profit: '₹30,000/acre',
                    reason: 'Good option for low water availability and current season.'
                }
            ]);
            setLoading(false);
            toast.success('Analysis Complete!');
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.aiCropSuggestions}</h1>
                <p className="text-muted-foreground">{t.cropSuggestionsDesc}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Form */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>{t.farmDetails}</CardTitle>
                        <CardDescription>{t.enterFarmConditions}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAnalyze} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t.soilType}</label>
                                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option>Clay Loam</option>
                                    <option>Red Soil</option>
                                    <option>Black Soil</option>
                                    <option>Sandy Soil</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t.nitrogen}</label>
                                <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. 50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t.phosphorus}</label>
                                <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. 40" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t.potassium}</label>
                                <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. 30" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">{t.phLevel}</label>
                                <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. 6.5" />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? t.analyzing : t.getSuggestions}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Results */}
                <div className="lg:col-span-2 space-y-4">
                    {suggestions ? (
                        suggestions.map((crop, index) => (
                            <Card key={index} className="border-l-4 border-l-primary">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl text-primary">{crop.name}</CardTitle>
                                            <CardDescription>{t.matchConfidence}: {crop.confidence}</CardDescription>
                                        </div>
                                        <div className="bg-primary/10 px-3 py-1 rounded-full text-sm font-medium text-primary">
                                            {crop.profit}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Sun className="h-4 w-4 text-muted-foreground" />
                                            <span>{t.duration}: {crop.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Droplets className="h-4 w-4 text-muted-foreground" />
                                            <span>{t.water}: {crop.water}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Thermometer className="h-4 w-4 text-muted-foreground" />
                                            <span>{t.climate}: Suitable</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                                        <strong>{t.whyThisCrop}</strong> {crop.reason}
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                            <Sprout className="h-12 w-12 mb-4 opacity-20" />
                            <p>{t.noSuggestions}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
