export const CROPS = [
    { id: 1, name: 'Wheat', nameKn: 'ಗೋಧಿ', nameHi: 'गेहूँ', price: 2200, trend: 'up' },
    { id: 2, name: 'Rice', nameKn: 'ಅಕ್ಕಿ', nameHi: 'चावल', price: 3500, trend: 'stable' },
    { id: 3, name: 'Tomato', nameKn: 'ಟೊಮ್ಯಾಟೋ', nameHi: 'टमाटर', price: 1500, trend: 'down' },
    { id: 4, name: 'Potato', nameKn: 'ಆಲೂಗಡ್ಡೆ', nameHi: 'आलू', price: 1800, trend: 'up' },
    { id: 5, name: 'Onion', nameKn: 'ಈರುಳ್ಳಿ', nameHi: 'प्याज़', price: 2500, trend: 'up' },
];

export const WEATHER_DATA = {
    current: { temp: 28, condition: 'Sunny', humidity: 65, wind: 12 },
    forecast: [
        { day: 'Mon', temp: 29, condition: 'Cloudy' },
        { day: 'Tue', temp: 27, condition: 'Rain' },
        { day: 'Wed', temp: 28, condition: 'Sunny' },
        { day: 'Thu', temp: 30, condition: 'Sunny' },
        { day: 'Fri', temp: 29, condition: 'Cloudy' },
    ]
};

export const MARKET_UPDATES = [
    { id: 1, crop: 'Wheat', mandi: 'APMC Mandya', price: 2250, date: '2025-12-05' },
    { id: 2, crop: 'Rice', mandi: 'APMC Shimoga', price: 3600, date: '2025-12-05' },
    { id: 3, crop: 'Tomato', mandi: 'APMC Kolar', price: 1400, date: '2025-12-05' },
];
