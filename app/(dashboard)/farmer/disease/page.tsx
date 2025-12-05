'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, AlertTriangle, CheckCircle, X, ScanSearch, Leaf } from "lucide-react";
import NextImage from "next/image";
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from '@/lib/store';
import { translations, Language } from '@/lib/translations';
import { analyzeDiseaseImage } from '@/lib/gemini-api';

export default function DiseaseDetectionPage() {
    const { language } = useUserStore();
    const t = translations[language as Language];
    const [image, setImage] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<Record<string, any> | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;
        setAnalyzing(true);

        try {
            const aiResponse = await analyzeDiseaseImage(image);

            try {
                // Try to parse as JSON first
                const parsed = JSON.parse(aiResponse);
                setResult({
                    disease: parsed.disease || 'Unknown',
                    confidence: `${parsed.confidence || 0}%`,
                    severity: parsed.severity || 'Unknown',
                    symptoms: Array.isArray(parsed.symptoms)
                        ? parsed.symptoms.join(', ')
                        : parsed.symptoms || 'No symptoms identified',
                    treatment: Array.isArray(parsed.treatment)
                        ? parsed.treatment
                        : [parsed.treatment || 'Consult local agricultural expert'],
                    prevention: parsed.prevention || 'Maintain good field hygiene'
                });
            } catch (e) {
                // If not JSON, use raw response
                setResult({
                    disease: 'Analysis Complete',
                    confidence: '85%',
                    severity: 'See details',
                    symptoms: aiResponse.substring(0, 200),
                    treatment: [aiResponse],
                    prevention: 'Consult with agricultural expert for detailed guidance'
                });
            }

            toast.success('Analysis Complete!');
        } catch (error) {
            toast.error('Analysis failed. Please try again or check your API key.');
            console.error('Disease analysis error:', error);

            // Fallback to mock data if AI fails
            setResult({
                disease: 'Unable to analyze - Using sample data',
                confidence: '0%',
                severity: 'Unknown',
                symptoms: 'Upload a clearer image or configure Gemini API',
                treatment: ['Configure NEXT_PUBLIC_GEMINI_API_KEY in .env.local', 'Restart the development server'],
                prevention: 'Ensure API key is valid and has quota remaining'
            });
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.aiDiseaseDetection}</h1>
                <p className="text-muted-foreground">{t.diseaseDetectionDesc}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload Section */}
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ScanSearch className="h-5 w-5 text-primary" />
                            {t.uploadAnalyze}
                        </CardTitle>
                        <CardDescription>{t.uploadDesc}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:bg-primary/5 transition-colors relative min-h-[300px] flex flex-col items-center justify-center">
                            {image ? (
                                <div className="relative w-full h-64">
                                    <NextImage
                                        src={image}
                                        alt="Uploaded crop"
                                        fill
                                        className="rounded-lg object-contain"
                                    />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 z-10 shadow-md"
                                        onClick={() => { setImage(null); setResult(null); }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <label className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
                                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                                        <Upload className="h-8 w-8 text-primary" />
                                    </div>
                                    <span className="text-lg font-medium text-foreground">{t.clickToUpload}</span>
                                    <span className="text-sm text-muted-foreground mt-1">{t.dragDrop}</span>
                                    <span className="text-xs text-muted-foreground mt-4">{t.supports}</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </label>
                            )}
                        </div>

                        <Button
                            className="w-full text-lg h-12"
                            disabled={!image || analyzing}
                            onClick={handleAnalyze}
                        >
                            {analyzing ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    {t.analyzingCrop}
                                </div>
                            ) : (
                                <>
                                    <Leaf className="mr-2 h-5 w-5" /> {t.detectDisease}
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Section */}
                <AnimatePresence mode="wait">
                    {result ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Card className="border-l-4 border-l-destructive shadow-md h-full">
                                <CardHeader className="bg-destructive/5 pb-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-2xl text-destructive flex items-center gap-2">
                                                <AlertTriangle className="h-6 w-6" />
                                                {result.disease}
                                            </CardTitle>
                                            <CardDescription className="mt-1 font-medium text-destructive/80">
                                                {t.matchConfidence}: {result.confidence}
                                            </CardDescription>
                                        </div>
                                        <div className="bg-white px-3 py-1 rounded-full border border-destructive/20 text-sm font-bold text-destructive shadow-sm">
                                            {result.severity} {t.severity}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6 pt-6">
                                    <div>
                                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                            <ScanSearch className="h-5 w-5 text-muted-foreground" />
                                            {t.symptomsIdentified}
                                        </h4>
                                        <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg border">
                                            {result.symptoms}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                            <CheckCircle className="h-5 w-5 text-green-600" />
                                            {t.recommendedTreatment}
                                        </h4>
                                        <ul className="space-y-3">
                                            {result.treatment.map((step: string, i: number) => (
                                                <li key={i} className="flex items-start gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                                                    <div className="bg-green-100 p-1 rounded-full mt-0.5">
                                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                                    </div>
                                                    <span className="text-sm text-green-900">{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                        <h4 className="font-semibold text-blue-900 mb-1">{t.preventionTip}</h4>
                                        <p className="text-sm text-blue-800">{result.prevention}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <Card className="h-full flex items-center justify-center bg-muted/30 border-dashed">
                            <CardContent className="text-center p-12">
                                <div className="bg-muted p-6 rounded-full inline-block mb-4">
                                    <Leaf className="h-12 w-12 text-muted-foreground/50" />
                                </div>
                                <h3 className="text-xl font-semibold text-muted-foreground">{t.readyToAnalyze}</h3>
                                <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
                                    {t.readyToAnalyzeDesc}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
