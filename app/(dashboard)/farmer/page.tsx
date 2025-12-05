'use client';

import { WeatherWidget } from "@/components/weather/weather-widget";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, AlertTriangle, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { CROPS } from "@/lib/mock-data";
import { useUserStore } from '@/lib/store';
import { translations, Language } from '@/lib/translations';

export default function FarmerDashboard() {
    const { language } = useUserStore();
    const t = translations[language as Language];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.dashboard}</h1>
                <p className="text-muted-foreground">{t.happening}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Weather Widget */}
                <div className="lg:col-span-1">
                    <WeatherWidget />
                </div>

                {/* Quick Actions */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>{t.quickActions}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link href="/farmer/disease">
                            <Button variant="outline" className="w-full h-24 flex flex-col gap-2 border-primary/20 hover:bg-primary/5">
                                <AlertTriangle className="h-6 w-6 text-destructive" />
                                {t.checkDisease}
                            </Button>
                        </Link>
                        <Link href="/farmer/crops">
                            <Button variant="outline" className="w-full h-24 flex flex-col gap-2 border-primary/20 hover:bg-primary/5">
                                <Sprout className="h-6 w-6 text-primary" />
                                {t.newCropPlan}
                            </Button>
                        </Link>
                        <Link href="/farmer/assistant">
                            <Button variant="outline" className="w-full h-24 flex flex-col gap-2 border-primary/20 hover:bg-primary/5">
                                <span className="text-2xl">🤖</span>
                                {t.askAssistant}
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Market Trends Preview */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>{t.marketTrends}</CardTitle>
                        <CardDescription>{t.currentPrices}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {CROPS.slice(0, 3).map((crop) => (
                                <div key={crop.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Sprout className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{language === 'kn' ? crop.nameKn : language === 'hi' ? crop.nameHi : crop.name}</div>
                                            <div className="text-xs text-muted-foreground">{crop.nameKn} / {crop.nameHi}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold">₹{crop.price}/q</div>
                                        <div className={`text-xs ${crop.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                            {crop.trend === 'up' ? `▲ ${t.rising}` : `▼ ${t.falling}`}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <Button variant="link" className="text-primary">{t.viewAll} <ArrowRight className="ml-2 h-4 w-4" /></Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Alerts */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>{t.alerts}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-l-4 border-l-destructive">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-destructive text-lg">
                                        <AlertTriangle className="h-5 w-5" />
                                        {t.pestAlert}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {t.pestAlertDesc}
                                    </p>
                                    <Button variant="outline" size="sm" className="w-full">{t.viewPrecautions}</Button>
                                </CardContent>
                            </Card>

                            <Card className="border-l-4 border-l-primary">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-primary text-lg">
                                        <TrendingUp className="h-5 w-5" />
                                        {t.newScheme}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {t.newSchemeDesc}
                                    </p>
                                    <Link href="/farmer/schemes">
                                        <Button variant="outline" size="sm" className="w-full">{t.checkStatus}</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
