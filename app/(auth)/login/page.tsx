'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/lib/store';
import { Sprout, ShoppingBag } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const { login, setRole } = useUserStore();
    const [selectedRole, setSelectedRole] = useState<'farmer' | 'buyer' | null>(null);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'phone' | 'otp'>('phone');

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) {
            toast.error('Please select a role first');
            return;
        }
        if (phone.length < 10) {
            toast.error('Please enter a valid phone number');
            return;
        }
        // Mock OTP sending
        toast.success('OTP sent to ' + phone);
        setStep('otp');
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp === '1234') { // Mock OTP
            login();
            setRole(selectedRole);
            toast.success('Login successful!');
            router.push(`/${selectedRole}`);
        } else {
            toast.error('Invalid OTP. Use 1234');
        }
    };

    return (
        <Card className="w-full">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-primary">Welcome Back</CardTitle>
                <CardDescription>Login to your KrishiMitraAI account</CardDescription>
            </CardHeader>
            <CardContent>
                {step === 'phone' ? (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-medium">Select Role</label>
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

                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="Enter your mobile number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full">Send OTP</Button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="otp" className="text-sm font-medium">Enter OTP</label>
                            <input
                                id="otp"
                                type="text"
                                placeholder="Enter 4-digit OTP"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={4}
                                required
                            />
                            <p className="text-xs text-muted-foreground">Hint: Use 1234</p>
                        </div>

                        <Button type="submit" className="w-full">Verify & Login</Button>
                        <Button type="button" variant="ghost" className="w-full" onClick={() => setStep('phone')}>
                            Back to Phone
                        </Button>
                    </form>
                )}
            </CardContent>
            <CardFooter className="justify-center">
                <p className="text-sm text-muted-foreground">
                    Don't have an account? <Link href="/signup" className="text-primary hover:underline">Sign up</Link>
                </p>
            </CardFooter>
        </Card>
    );
}
