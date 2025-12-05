import { NextResponse } from 'next/server';
import { getCurrentWeather, getMockWeather } from '@/lib/weather-api';

export async function GET() {
    try {
        // Default to Bangalore coordinates for now, or get from query params
        const lat = 12.9716;
        const lon = 77.5946;

        const weatherData = await getCurrentWeather(lat, lon);

        if (!weatherData) {
            return NextResponse.json(getMockWeather());
        }

        // Transform to match the expected format for the widget if needed
        // The widget expects { current: { temp, condition, humidity, wind }, forecast: [...] }
        // Our API returns { temperature, condition, humidity, windSpeed, forecast: [...] }

        return NextResponse.json({
            current: {
                temp: weatherData.temperature,
                condition: weatherData.condition,
                humidity: weatherData.humidity,
                wind: weatherData.windSpeed
            },
            forecast: weatherData.forecast
        });
    } catch (error) {
        console.error('Weather API Error:', error);
        return NextResponse.json(getMockWeather());
    }
}
