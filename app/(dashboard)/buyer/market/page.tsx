'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MARKET_UPDATES } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function MarketPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Market Prices</h1>
                <p className="text-muted-foreground">Real-time prices from APMC mandis across Karnataka.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MARKET_UPDATES.map((update) => (
                    <Card key={update.id}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium">{update.crop}</CardTitle>
                            <p className="text-sm text-muted-foreground">{update.mandi}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-2xl font-bold">₹{update.price}</div>
                                    <p className="text-xs text-muted-foreground">per quintal</p>
                                </div>
                                <div className="flex items-center text-green-600 text-sm font-medium">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    +1.2%
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t text-xs text-muted-foreground flex justify-between">
                                <span>Updated: {update.date}</span>
                                <span>Quality: Grade A</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
