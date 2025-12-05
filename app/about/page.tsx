'use client';

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Users, Globe, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* Hero Section */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-primary">About KrishiMitraAI</h1>
                        <p className="text-xl text-muted-foreground">
                            Empowering Indian farmers with cutting-edge technology for a sustainable future.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Our Mission</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                KrishiMitraAI is dedicated to bridging the gap between traditional farming and modern technology.
                                We aim to provide every farmer with access to AI-driven insights, real-time market data, and
                                expert knowledge to maximize their yield and income.
                            </p>
                        </div>
                        <div className="bg-muted/30 p-8 rounded-2xl flex items-center justify-center">
                            <Sprout className="h-32 w-32 text-primary/20" />
                        </div>
                    </div>

                    {/* Values */}
                    <div className="grid sm:grid-cols-3 gap-6">
                        <Card>
                            <CardContent className="pt-6 text-center space-y-2">
                                <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Globe className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="font-bold">Accessibility</h3>
                                <p className="text-sm text-muted-foreground">Available in multiple local languages for everyone.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center space-y-2">
                                <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <Users className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="font-bold">Community</h3>
                                <p className="text-sm text-muted-foreground">Connecting farmers, buyers, and experts together.</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 text-center space-y-2">
                                <div className="mx-auto h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <ShieldCheck className="h-6 w-6 text-yellow-600" />
                                </div>
                                <h3 className="font-bold">Trust</h3>
                                <p className="text-sm text-muted-foreground">Reliable data and secure transactions.</p>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
