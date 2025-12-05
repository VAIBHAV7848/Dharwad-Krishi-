'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, MapPin, Phone, MessageSquare } from "lucide-react";
import Image from "next/image";

const LISTINGS = [
    { id: 1, farmer: 'Ramesh Kumar', crop: 'Organic Wheat', location: 'Mandya', quantity: '50 Quintals', price: '₹2,300/q', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80' },
    { id: 2, farmer: 'Suresh Gowda', crop: 'Sona Masoori Rice', location: 'Shimoga', quantity: '100 Quintals', price: '₹3,800/q', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80' },
    { id: 3, farmer: 'Lakshmi Devi', crop: 'Fresh Tomatoes', location: 'Kolar', quantity: '200 Crates', price: '₹1,500/q', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80' },
];

export default function ListingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Farmer Listings</h1>
                <p className="text-muted-foreground">Direct from farm to your warehouse.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LISTINGS.map((listing) => (
                    <Card key={listing.id} className="overflow-hidden">
                        <div className="h-48 bg-muted relative">
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                                <Sprout className="h-12 w-12" />
                            </div>
                            <Image
                                src={listing.image}
                                alt={listing.crop}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{listing.crop}</CardTitle>
                                    <CardDescription className="flex items-center mt-1">
                                        <MapPin className="h-3 w-3 mr-1" /> {listing.location}
                                    </CardDescription>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-primary">{listing.price}</div>
                                    <div className="text-xs text-muted-foreground">{listing.quantity}</div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                    {listing.farmer.charAt(0)}
                                </div>
                                Farmer: {listing.farmer}
                            </div>
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Button className="w-full">
                                <Phone className="h-4 w-4 mr-2" /> Call
                            </Button>
                            <Button variant="outline" className="w-full">
                                <MessageSquare className="h-4 w-4 mr-2" /> Chat
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
