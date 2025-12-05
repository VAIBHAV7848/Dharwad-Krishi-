
export type CropType = 'Wheat' | 'Rice' | 'Tomato' | 'Potato' | 'Cotton' | 'Sugarcane' | 'Maize';
export type SoilType = 'Sandy' | 'Loamy' | 'Clay' | 'Black';
export type IrrigationMethod = 'Drip' | 'Sprinkler' | 'Flood';

interface IrrigationInput {
    crop: CropType;
    soil: SoilType;
    fieldSizeAcres: number;
    irrigationMethod: IrrigationMethod;
    isCriticalStage: boolean;
    temperature: number;
    humidity: number;
    windSpeed: number;
    rainForecastMm: number;
    chanceOfRain: number;
}

interface IrrigationResult {
    waterNeedMm: number;
    totalWaterLiters: number;
    advice: string;
    status: 'irrigate' | 'skip' | 'delay';
}

// Crop Coefficients (Kc) - Simplified averages
const CROP_KC: Record<CropType, number> = {
    'Wheat': 1.15,
    'Rice': 1.20,
    'Tomato': 1.05,
    'Potato': 1.15,
    'Cotton': 1.20,
    'Sugarcane': 1.25,
    'Maize': 1.20
};

// Irrigation Efficiency
const IRRIGATION_EFFICIENCY: Record<IrrigationMethod, number> = {
    'Drip': 0.90,
    'Sprinkler': 0.75,
    'Flood': 0.60
};

// Soil Water Holding Capacity Factors (Just for advice tuning)
const SOIL_FACTOR: Record<SoilType, string> = {
    'Sandy': 'Low water retention. Irrigate frequently with less water.',
    'Loamy': 'Good water retention. Standard irrigation.',
    'Clay': 'High water retention. Avoid waterlogging.',
    'Black': 'Very high retention. Watch for cracking when dry.'
};

export function calculateIrrigation(input: IrrigationInput): IrrigationResult {
    const {
        crop,
        fieldSizeAcres,
        irrigationMethod,
        isCriticalStage,
        temperature,
        rainForecastMm,
        chanceOfRain
    } = input;

    // 1. Estimate ET0 (Reference Evapotranspiration) based on Temperature
    // Simple approximation for Indian context
    let et0 = 4.5; // Base average
    if (temperature > 35) et0 = 7.5;
    else if (temperature > 30) et0 = 6.0;
    else if (temperature > 25) et0 = 5.0;
    else if (temperature < 15) et0 = 3.0;

    // Adjust for wind/humidity if needed (simplified)
    // High wind increases ET0, High humidity decreases it.

    // 2. Get Crop Coefficient (Kc)
    let kc = CROP_KC[crop] || 1.0;

    // Increase Kc for critical stage
    if (isCriticalStage) {
        kc *= 1.15; // Increase by 15%
    }

    // 3. Calculate Crop Water Need (ETc)
    const etc = et0 * kc;

    // 4. Calculate Effective Rainfall (Simplified: 80% of forecast is effective)
    const effectiveRain = rainForecastMm * 0.8;

    // 5. Calculate Net Water Need
    let netWaterNeed = etc - effectiveRain;

    // If high chance of rain but low volume predicted, maybe delay?
    // If rain > need, no irrigation
    if (netWaterNeed < 0) netWaterNeed = 0;

    // 6. Adjust for Irrigation Efficiency (Gross Water Need)
    const efficiency = IRRIGATION_EFFICIENCY[irrigationMethod];
    const grossWaterNeed = netWaterNeed / efficiency;

    // 7. Calculate Total Volume
    // 1 acre = 4046.86 sq meters
    // 1 mm = 1 liter / sq meter
    const fieldAreaSqM = fieldSizeAcres * 4046.86;
    const totalLiters = grossWaterNeed * fieldAreaSqM;

    // 8. Generate Advice
    let status: 'irrigate' | 'skip' | 'delay' = 'irrigate';
    let advice = '';

    if (rainForecastMm > etc) {
        status = 'skip';
        advice = `Expected rain (${rainForecastMm}mm) is sufficient. Skip irrigation.`;
    } else if (chanceOfRain > 70 && rainForecastMm > 2) {
        status = 'delay';
        advice = `High chance of rain (${chanceOfRain}%). Delay irrigation and check later.`;
    } else {
        status = 'irrigate';
        advice = `Water needed today: ${grossWaterNeed.toFixed(1)} mm.`;

        if (isCriticalStage) {
            advice += ` Critical stage detected: Irrigation increased by 15%.`;
        }
    }

    // Add soil advice
    // advice += ` ${SOIL_FACTOR[input.soil]}`;

    return {
        waterNeedMm: parseFloat(grossWaterNeed.toFixed(1)),
        totalWaterLiters: Math.round(totalLiters),
        advice,
        status
    };
}
