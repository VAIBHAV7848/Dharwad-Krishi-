'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CloudSun, Droplets, Wind, MapPin, Search, Thermometer, Calendar } from "lucide-react";
import { useUserStore } from '@/lib/store';
import { translations, Language } from '@/lib/translations';
import { getWeatherByCity, getCurrentWeather, WeatherData } from '@/lib/weather-api';
import { toast } from 'react-hot-toast';

export default function WeatherPage() {
    const { language } = useUserStore();
    const t = translations[language as Language];

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load initial weather for a default location or user's location
        loadInitialWeather();
    }, []);

    const loadInitialWeather = async () => {
        setLoading(true);

        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by this browser.");
            const data = await getWeatherByCity('Bangalore');
            setWeather(data);
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const data = await getCurrentWeather(position.coords.latitude, position.coords.longitude);
                    if (data) {
                        setWeather(data);
                        // Also update the city input to show the detected location
                        setCity(data.location.split(',')[0]);
                    } else {
                        // Fallback if API fails with coords
                        const fallbackData = await getWeatherByCity('Bangalore');
                        setWeather(fallbackData);
                    }
                } catch (error) {
                    console.error("Error fetching weather by coords:", error);
                    const fallbackData = await getWeatherByCity('Bangalore');
                    setWeather(fallbackData);
                } finally {
                    setLoading(false);
                }
            },
            async (error) => {
                console.error("Geolocation error:", error);
                toast.error("Could not get your location. Showing default.");
                const data = await getWeatherByCity('Bangalore');
                setWeather(data);
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!city.trim()) return;

        setLoading(true);
        try {
            const data = await getWeatherByCity(city);
            if (data) {
                setWeather(data);
            } else {
                toast.error('City not found');
            }
        } catch (error) {
            toast.error('Failed to fetch weather');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !weather) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.weatherForecast}</h1>
                <p className="text-muted-foreground">{t.weatherDesc || "Real-time weather updates and 5-day forecast"}</p>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="relative flex-1">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Enter city name..."
                                className="pl-9"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <Button type="button" variant="outline" onClick={loadInitialWeather} disabled={loading} title="Use my location">
                            <MapPin className="h-4 w-4" />
                        </Button>
                        <Button type="submit" disabled={loading}>
                            <Search className="h-4 w-4 mr-2" />
                            {loading ? 'Searching...' : 'Search'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {weather && (
                <>
                    {/* Current Weather */}
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
                        <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-center md:text-left">
                                    <h2 className="text-2xl font-semibold flex items-center gap-2 justify-center md:justify-start">
                                        <MapPin className="h-6 w-6" />
                                        {weather.location}
                                    </h2>
                                    <div className="mt-4">
                                        <span className="text-7xl font-bold">{weather.temperature}°</span>
                                        <div className="text-xl mt-2 opacity-90">{weather.condition}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                        <Droplets className="h-8 w-8 opacity-80" />
                                        <div>
                                            <div className="text-sm opacity-70">Humidity</div>
                                            <div className="text-xl font-semibold">{weather.humidity}%</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                        <Wind className="h-8 w-8 opacity-80" />
                                        <div>
                                            <div className="text-sm opacity-70">Wind</div>
                                            <div className="text-xl font-semibold">{weather.windSpeed} km/h</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:block">
                                    <img
                                        src={weather.icon}
                                        alt={weather.condition}
                                        className="h-32 w-32 object-contain drop-shadow-lg"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 5-Day Forecast */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            5-Day Forecast
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {weather.forecast.map((day, index) => (
                                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                                    <CardContent className="pt-6">
                                        <div className="font-medium text-muted-foreground mb-2">{day.day}</div>
                                        <img
                                            src={day.icon}
                                            alt={day.condition}
                                            className="h-12 w-12 mx-auto mb-2"
                                        />
                                        <div className="font-bold text-xl mb-1">{day.temp}°</div>
                                        <div className="text-xs text-muted-foreground line-clamp-1">{day.condition}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
