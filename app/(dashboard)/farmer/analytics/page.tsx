'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { useUserStore } from '@/lib/store';
import { translations, Language } from '@/lib/translations';
import { exportAnalyticsToPDF } from '@/lib/pdf-export';
import toast from 'react-hot-toast';

const data = [
    { month: 'Jan', tomato: 20, onion: 40, wheat: 2200 },
    { month: 'Feb', tomato: 25, onion: 35, wheat: 2150 },
    { month: 'Mar', tomato: 18, onion: 45, wheat: 2100 },
    { month: 'Apr', tomato: 30, onion: 55, wheat: 2250 },
    { month: 'May', tomato: 45, onion: 60, wheat: 2300 },
    { month: 'Jun', tomato: 40, onion: 50, wheat: 2280 },
];

export default function AnalyticsPage() {
    const { language } = useUserStore();
    const t = translations[language as Language];
    const [selectedCrop, setSelectedCrop] = useState('tomato');

    const getCropColor = (crop: string) => {
        switch (crop) {
            case 'tomato': return '#ef4444';
            case 'onion': return '#8b5cf6';
            case 'wheat': return '#eab308';
            default: return '#22c55e';
        }
    };

    const handleExportPDF = () => {
        const cropData = {
            cropName: t[selectedCrop as keyof typeof t] as string,
            data: data.map(item => ({
                month: item.month,
                price: item[selectedCrop as keyof typeof item] as number
            }))
        };

        try {
            exportAnalyticsToPDF(cropData);
            toast.success('PDF exported successfully!');
        } catch (error) {
            toast.error('Failed to export PDF');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.analytics}</h1>
                <p className="text-muted-foreground">{t.marketTrends}</p>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                        <CardTitle>{t.priceTrends}</CardTitle>
                        <CardDescription>{t.last6Months}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleExportPDF}
                            className="gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Export PDF
                        </Button>
                        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={t.selectCrop} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="tomato">{t.tomatoUnit}</SelectItem>
                                <SelectItem value="onion">{t.onionUnit}</SelectItem>
                                <SelectItem value="wheat">{t.wheatUnit}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCrop" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={getCropColor(selectedCrop)} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={getCropColor(selectedCrop)} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: 'var(--radius)' }}
                                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey={selectedCrop}
                                    stroke={getCropColor(selectedCrop)}
                                    fillOpacity={1}
                                    fill="url(#colorCrop)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
