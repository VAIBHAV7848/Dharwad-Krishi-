'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/lib/store';
import { Sprout, ShoppingBag } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SignupPage() {
    const router = useRouter();
    const { login, setRole } = useUserStore();
    const [selectedRole, setSelectedRole] = useState<'farmer' | 'buyer' | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        location: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) {
            toast.error('Please select a role');
            return;
        }
        // Mock Signup
        login();
        setRole(selectedRole);
        toast.success('Account created successfully!');
        router.push(`/${selectedRole}`);
    };

    return (
        <Card className="w-full">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-primary">Create Account</CardTitle>
                <CardDescription>Join KrishiMitraAI today</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <label className="text-sm font-medium">I am a...</label>
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 transition-colors ${selectedRole === 'farmer' ? 'bg-primary/10 border-primary' : 'hover:bg-muted'}`}
                                onClick={() => setSelectedRole('farmer')}
                            >
                                <Sprout className="h-8 w-8 text-primary" />
                                <span className="font-medium">Farmer</span>
                            </div>
                            <div
                                className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 transition-colors ${selectedRole === 'buyer' ? 'bg-primary/10 border-primary' : 'hover:bg-muted'}`}
                                onClick={() => setSelectedRole('buyer')}
                            >
                                <ShoppingBag className="h-8 w-8 text-primary" />
                                <span className="font-medium">Buyer</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="location" className="text-sm font-medium">Location</label>
                            <input
                                id="location"
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full">Create Account</Button>
                </form>
            </CardContent>
            <CardFooter className="justify-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
                </p>
            </CardFooter>
        </Card>
    );
}
