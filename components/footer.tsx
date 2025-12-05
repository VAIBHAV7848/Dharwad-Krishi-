import { Sprout } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-muted py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Sprout className="h-6 w-6 text-primary" />
                            <span className="text-lg font-bold text-primary">KrishiMitraAI</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Empowering farmers with technology for a better tomorrow.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">Weather Forecast</a></li>
                            <li><a href="#" className="hover:text-primary">Crop Disease Detection</a></li>
                            <li><a href="#" className="hover:text-primary">Market Prices</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">About Us</a></li>
                            <li><a href="#" className="hover:text-primary">Contact</a></li>
                            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">Twitter</a></li>
                            <li><a href="#" className="hover:text-primary">Facebook</a></li>
                            <li><a href="#" className="hover:text-primary">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    © 2025 KrishiMitraAI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
