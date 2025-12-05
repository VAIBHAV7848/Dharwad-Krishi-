'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, TrendingUp, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CROPS } from "@/lib/mock-data";

export default function BuyerDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Buyer Dashboard</h1>
                <p className="text-muted-foreground">Manage your orders and track market trends.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+2 from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹45,231</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Connected Farmers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">Across 3 districts</p>
                    </CardContent>
                </Card>

                {/* Market Overview */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Market Overview</CardTitle>
                        <CardDescription>Top commodities today</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {CROPS.map((crop) => (
                                <div key={crop.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <ShoppingBag className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium">{crop.name}</div>
                                            <div className="text-xs text-muted-foreground">{crop.nameKn}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold">₹{crop.price}/q</div>
                                        <div className={`text-xs ${crop.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                            {crop.trend === 'up' ? '▲ +2.5%' : '▼ -1.2%'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <Link href="/buyer/market">
                                <Button variant="outline" className="w-full">View Detailed Market Report</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                                <div>
                                    <p className="text-sm font-medium">Order #1234 Confirmed</p>
                                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-2 w-2 mt-2 rounded-full bg-green-500" />
                                <div>
                                    <p className="text-sm font-medium">Payment Received</p>
                                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="h-2 w-2 mt-2 rounded-full bg-yellow-500" />
                                <div>
                                    <p className="text-sm font-medium">New Farmer Inquiry</p>
                                    <p className="text-xs text-muted-foreground">Yesterday</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
