'use client';

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, CloudSun, ShoppingBag, ShieldCheck, MessageSquare, Landmark } from "lucide-react";

export default function FeaturesPage() {
    const features = [
        {
            icon: CloudSun,
            title: "Smart Weather Forecasts",
            desc: "Hyper-local weather updates and 5-day forecasts to help you plan your farming activities efficiently.",
            color: "text-yellow-500"
        },
        {
            icon: ShieldCheck,
            title: "AI Disease Detection",
            desc: "Simply upload a photo of your crop to detect diseases instantly and get treatment recommendations.",
            color: "text-green-500"
        },
        {
            icon: ShoppingBag,
            title: "Real-time Market Prices",
            desc: "Stay updated with the latest mandi prices for various crops to ensure you get the best deal.",
            color: "text-blue-500"
        },
        {
            icon: MessageSquare,
            title: "AI Assistant (Krishi Mitra)",
            desc: "A 24/7 voice-enabled assistant that speaks your language (Kannada, Hindi, English) to answer all your queries.",
            color: "text-purple-500"
        },
        {
            icon: Sprout,
            title: "Crop Suggestions",
            desc: "Get personalized crop recommendations based on your soil type, season, and local conditions.",
            color: "text-emerald-500"
        },
        {
            icon: Landmark,
            title: "Government Schemes",
            desc: "Easy access to information about the latest government subsidies and schemes for farmers.",
            color: "text-orange-500"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Powerful Features</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to manage your farm smarter, better, and more profitably.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <Icon className={`h-10 w-10 mb-2 ${feature.color}`} />
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        {feature.desc}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </main>
            <Footer />
        </div>
    );
}
