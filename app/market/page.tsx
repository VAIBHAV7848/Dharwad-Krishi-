'use client';

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function MarketPage() {
    // Mock data for public view
    const marketData = [
        { id: 1, crop: "Tomato", price: 45, unit: "kg", trend: "up", change: "+5%" },
        { id: 2, crop: "Onion", price: 30, unit: "kg", trend: "down", change: "-2%" },
        { id: 3, crop: "Potato", price: 25, unit: "kg", trend: "stable", change: "0%" },
        { id: 4, crop: "Wheat", price: 2200, unit: "quintal", trend: "up", change: "+1.5%" },
        { id: 5, crop: "Rice", price: 3500, unit: "quintal", trend: "stable", change: "0%" },
        { id: 6, crop: "Cotton", price: 6000, unit: "quintal", trend: "up", change: "+3%" },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Market Prices</h1>
                    <p className="text-xl text-muted-foreground">
                        Live mandi rates from major markets across the region.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marketData.map((item) => (
                        <Card key={item.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xl font-bold">{item.crop}</CardTitle>
                                {item.trend === 'up' && <TrendingUp className="h-5 w-5 text-green-500" />}
                                {item.trend === 'down' && <TrendingDown className="h-5 w-5 text-red-500" />}
                                {item.trend === 'stable' && <Minus className="h-5 w-5 text-gray-500" />}
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">₹{item.price}<span className="text-sm font-normal text-muted-foreground">/{item.unit}</span></div>
                                <p className={`text-xs mt-2 font-medium ${item.trend === 'up' ? 'text-green-600' :
                                        item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                                    }`}>
                                    {item.change} since yesterday
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-muted rounded-lg text-center">
                    <h3 className="text-lg font-semibold mb-2">Want more detailed insights?</h3>
                    <p className="text-muted-foreground mb-4">
                        Login to your dashboard to see historical trends, price predictions, and connect directly with buyers.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
