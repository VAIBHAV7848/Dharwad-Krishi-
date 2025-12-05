// Weather API utilities using WeatherAPI.com

export interface WeatherData {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    precip_mm: number;
    icon: string;
    location: string;
    forecast: ForecastDay[];
}

export interface ForecastDay {
    day: string;
    temp: number;
    condition: string;
    icon: string;
    rain_mm: number;
    chance_of_rain: number;
}

export async function getCurrentWeather(lat: number, lon: number): Promise<WeatherData | null> {
    const apiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;

    if (!apiKey) {
        console.error('WeatherAPI key not configured');
        return null;
    }

    try {
        // Fetch current weather and forecast (3 days is free tier limit usually, but we ask for 5)
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=5&aqi=no&alerts=no`
        );

        const data = await response.json();

        if (data.error) {
            console.error('WeatherAPI error:', data.error.message);
            return null;
        }

        const current = data.current;
        const location = data.location;
        const forecastDays = data.forecast.forecastday;

        // Process forecast
        const forecast: ForecastDay[] = forecastDays.map((day: any) => {
            const date = new Date(day.date);
            return {
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                temp: Math.round(day.day.avgtemp_c),
                condition: day.day.condition.text,
                icon: day.day.condition.icon.replace('//', 'https://'),
                rain_mm: day.day.totalprecip_mm || 0,
                chance_of_rain: day.day.daily_chance_of_rain || 0
            };
        });

        return {
            temperature: Math.round(current.temp_c),
            condition: current.condition.text,
            humidity: current.humidity,
            windSpeed: Math.round(current.wind_kph),
            precip_mm: current.precip_mm || 0,
            icon: current.condition.icon.replace('//', 'https://'),
            location: `${location.name}, ${location.region}`,
            forecast
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

export async function getWeatherByCity(city: string): Promise<WeatherData | null> {
    const apiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;

    if (!apiKey) {
        console.error('WeatherAPI key not configured');
        return null;
    }

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=5&aqi=no&alerts=no`
        );

        const data = await response.json();

        if (data.error) {
            console.error('WeatherAPI error:', data.error.message);
            return null;
        }

        const current = data.current;
        const location = data.location;
        const forecastDays = data.forecast.forecastday;

        const forecast: ForecastDay[] = forecastDays.map((day: any) => {
            const date = new Date(day.date);
            return {
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                temp: Math.round(day.day.avgtemp_c),
                condition: day.day.condition.text,
                icon: day.day.condition.icon.replace('//', 'https://'),
                rain_mm: day.day.totalprecip_mm || 0,
                chance_of_rain: day.day.daily_chance_of_rain || 0
            };
        });

        return {
            temperature: Math.round(current.temp_c),
            condition: current.condition.text,
            humidity: current.humidity,
            windSpeed: Math.round(current.wind_kph),
            precip_mm: current.precip_mm || 0,
            icon: current.condition.icon.replace('//', 'https://'),
            location: `${location.name}, ${location.region}`,
            forecast
        };
    } catch (error) {
        console.error('Error fetching weather by city:', error);
        return null;
    }
}

// Mock weather data for fallback
export function getMockWeather(): WeatherData {
    return {
        temperature: 28,
        condition: 'Sunny',
        humidity: 65,
        windSpeed: 12,
        precip_mm: 0,
        icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
        location: 'Bangalore, Karnataka',
        forecast: [
            { day: 'Mon', temp: 29, condition: 'Sunny', icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png', rain_mm: 0, chance_of_rain: 0 },
            { day: 'Tue', temp: 27, condition: 'Partly cloudy', icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png', rain_mm: 0, chance_of_rain: 10 },
            { day: 'Wed', temp: 26, condition: 'Patchy rain possible', icon: 'https://cdn.weatherapi.com/weather/64x64/day/176.png', rain_mm: 2.5, chance_of_rain: 60 },
            { day: 'Thu', temp: 28, condition: 'Sunny', icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png', rain_mm: 0, chance_of_rain: 0 },
            { day: 'Fri', temp: 30, condition: 'Clear', icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png', rain_mm: 0, chance_of_rain: 0 },
        ]
    };
}
