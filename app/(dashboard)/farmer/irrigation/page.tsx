'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Droplets, CloudRain, Sprout, Wind, Thermometer, AlertCircle } from "lucide-react";
import { getCurrentWeather, WeatherData } from '@/lib/weather-api';
import { calculateIrrigation, CropType, SoilType, IrrigationMethod } from '@/lib/irrigation-engine';
import { toast } from 'react-hot-toast';

export default function IrrigationPage() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    // Form State
    const [crop, setCrop] = useState<CropType>('Wheat');
    const [soil, setSoil] = useState<SoilType>('Loamy');
    const [method, setMethod] = useState<IrrigationMethod>('Flood');
    const [fieldSize, setFieldSize] = useState<string>('1');
    const [isCritical, setIsCritical] = useState(false);

    // Result State
    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        loadWeather();
    }, []);

    const loadWeather = async () => {
        setLoading(true);
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const data = await getCurrentWeather(position.coords.latitude, position.coords.longitude);
                        setWeather(data);
                        setLoading(false);
                    },
                    (error) => {
                        console.error("Geo error:", error);
                        toast.error("Could not get location. Using default.");
                        // Fallback logic could go here
                        setLoading(false);
                    }
                );
            } else {
                setLoading(false);
            }
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    const handleCalculate = () => {
        if (!weather) {
            toast.error("Weather data not available yet.");
            return;
        }

        const size = parseFloat(fieldSize);
        if (isNaN(size) || size <= 0) {
            toast.error("Please enter a valid field size.");
            return;
        }

        // Get forecast for today (first element)
        const todayForecast = weather.forecast[0];

        const input = {
            crop,
            soil,
            fieldSizeAcres: size,
            irrigationMethod: method,
            isCriticalStage: isCritical,
            temperature: weather.temperature,
            humidity: weather.humidity,
            windSpeed: weather.windSpeed,
            rainForecastMm: todayForecast?.rain_mm || weather.precip_mm || 0,
            chanceOfRain: todayForecast?.chance_of_rain || 0
        };

        const res = calculateIrrigation(input);
        setResult(res);
    };

    if (loading) {
        return <div className="p-8 text-center">Loading weather data...</div>;
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Weather-Based Irrigation Engine</h1>
                <p className="text-muted-foreground">Smart water management for your crops.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Input Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sprout className="h-5 w-5 text-green-600" />
                            Farm Details
                        </CardTitle>
                        <CardDescription>Enter your field information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Crop Type</Label>
                            <Select value={crop} onValueChange={(v: CropType) => setCrop(v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Wheat">Wheat</SelectItem>
                                    <SelectItem value="Rice">Rice</SelectItem>
                                    <SelectItem value="Tomato">Tomato</SelectItem>
                                    <SelectItem value="Potato">Potato</SelectItem>
                                    <SelectItem value="Cotton">Cotton</SelectItem>
                                    <SelectItem value="Sugarcane">Sugarcane</SelectItem>
                                    <SelectItem value="Maize">Maize</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Soil Type</Label>
                            <Select value={soil} onValueChange={(v: SoilType) => setSoil(v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Sandy">Sandy</SelectItem>
                                    <SelectItem value="Loamy">Loamy</SelectItem>
                                    <SelectItem value="Clay">Clay</SelectItem>
                                    <SelectItem value="Black">Black</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Field Size (Acres)</Label>
                            <Input
                                type="number"
                                value={fieldSize}
                                onChange={(e) => setFieldSize(e.target.value)}
                                min="0.1"
                                step="0.1"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Irrigation Method</Label>
                            <Select value={method} onValueChange={(v: IrrigationMethod) => setMethod(v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Flood">Flood (Traditional)</SelectItem>
                                    <SelectItem value="Sprinkler">Sprinkler</SelectItem>
                                    <SelectItem value="Drip">Drip</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between border p-3 rounded-lg">
                            <div className="space-y-0.5">
                                <Label>Critical Growth Stage</Label>
                                <p className="text-xs text-muted-foreground">Flowering or fruit setting?</p>
                            </div>
                            <Switch checked={isCritical} onCheckedChange={setIsCritical} />
                        </div>

                        <Button onClick={handleCalculate} className="w-full">
                            Calculate Water Need
                        </Button>
                    </CardContent>
                </Card>

                {/* Weather & Results Section */}
                <div className="space-y-6">
                    {/* Weather Summary */}
                    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CloudRain className="h-5 w-5 text-blue-500" />
                                Local Weather Context
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {weather ? (
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Thermometer className="h-4 w-4 text-muted-foreground" />
                                        <span>{weather.temperature}°C</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Wind className="h-4 w-4 text-muted-foreground" />
                                        <span>{weather.windSpeed} km/h</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Droplets className="h-4 w-4 text-muted-foreground" />
                                        <span>{weather.humidity}% Humidity</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CloudRain className="h-4 w-4 text-muted-foreground" />
                                        <span>{weather.forecast[0]?.rain_mm || 0}mm Rain Exp.</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">Weather data unavailable.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Results */}
                    {result && (
                        <Card className={`border-2 ${result.status === 'irrigate' ? 'border-green-500 bg-green-50 dark:bg-green-950/20' :
                                result.status === 'skip' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' :
                                    'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
                            }`}>
                            <CardHeader>
                                <CardTitle className="text-xl">Recommendation</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-lg font-medium">
                                    {result.advice}
                                </div>

                                {result.status === 'irrigate' && (
                                    <div className="bg-background/50 p-4 rounded-lg space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Water Depth:</span>
                                            <span className="font-bold">{result.waterNeedMm} mm</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Total Volume:</span>
                                            <span className="font-bold">{result.totalWaterLiters.toLocaleString()} Liters</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            *Based on {fieldSize} acre(s) using {method} irrigation.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
