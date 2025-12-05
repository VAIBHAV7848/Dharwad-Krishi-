'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Droplets, Wind } from "lucide-react";
import { useEffect, useState } from "react";

export function WeatherWidget() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch('/api/weather')
            .then(res => res.json())
            .then(setData);
    }, []);

    if (!data) return (
        <Card className="h-full">
            <CardContent className="flex items-center justify-center h-full">
                Loading weather...
            </CardContent>
        </Card>
    );

    const { current, forecast } = data;

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CloudSun className="h-5 w-5 text-primary" />
                    Weather Forecast
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-4xl font-bold">{current.temp}°C</div>
                        <div className="text-muted-foreground">{current.condition}</div>
                    </div>
                    <div className="text-right space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center justify-end gap-2">
                            <Droplets className="h-4 w-4" /> {current.humidity}% Humidity
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <Wind className="h-4 w-4" /> {current.wind} km/h Wind
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-2 text-center">
                    {forecast.map((day: any, i: number) => (
                        <div key={i} className="bg-muted/50 rounded-lg p-2">
                            <div className="text-xs font-medium mb-1">{day.day}</div>
                            <CloudSun className="h-6 w-6 mx-auto mb-1 text-primary/80" />
                            <div className="text-sm font-bold">{day.temp}°</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
