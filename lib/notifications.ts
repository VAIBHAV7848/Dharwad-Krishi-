// Browser notification utilities
export class NotificationManager {
    private static instance: NotificationManager;
    private permission: NotificationPermission = 'default';

    private constructor() {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            this.permission = Notification.permission;
        }
    }

    static getInstance(): NotificationManager {
        if (!NotificationManager.instance) {
            NotificationManager.instance = new NotificationManager();
        }
        return NotificationManager.instance;
    }

    async requestPermission(): Promise<boolean> {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications');
            return false;
        }

        if (this.permission === 'granted') {
            return true;
        }

        const permission = await Notification.requestPermission();
        this.permission = permission;
        return permission === 'granted';
    }

    async showNotification(
        title: string,
        options?: {
            body?: string;
            icon?: string;
            tag?: string;
            data?: any;
            requireInteraction?: boolean;
        }
    ): Promise<void> {
        if (this.permission !== 'granted') {
            const granted = await this.requestPermission();
            if (!granted) {
                console.log('Notification permission denied');
                return;
            }
        }

        const defaultOptions = {
            icon: '/icon-192x192.png',
            badge: '/icon-72x72.png',
            ...options
        };

        new Notification(title, defaultOptions);
    }

    isSupported(): boolean {
        return 'Notification' in window;
    }

    hasPermission(): boolean {
        return this.permission === 'granted';
    }
}

// Predefined notification templates
export const notificationTemplates = {
    priceAlert: (crop: string, price: number, change: string) => ({
        title: '💰 Price Alert',
        body: `${crop} price is now ₹${price} (${change})`,
        tag: 'price-alert',
    }),

    weatherAlert: (condition: string) => ({
        title: '🌦️ Weather Alert',
        body: `${condition} expected in your area. Take necessary precautions.`,
        tag: 'weather-alert',
        requireInteraction: true,
    }),

    pestAlert: (pest: string) => ({
        title: '🐛 Pest Alert',
        body: `${pest} outbreak reported in your region`,
        tag: 'pest-alert',
        requireInteraction: true,
    }),

    schemeAlert: (schemeName: string) => ({
        title: '📋 New Scheme Available',
        body: `${schemeName} - Check your eligibility now`,
        tag: 'scheme-alert',
    }),

    harvestReminder: (crop: string, daysLeft: number) => ({
        title: '🌾 Harvest Reminder',
        body: `${crop} ready for harvest in ${daysLeft} days`,
        tag: 'harvest-reminder',
    }),
};

export const notificationManager = NotificationManager.getInstance();
