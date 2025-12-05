'use client';

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight, Sprout, CloudSun, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useUserStore } from '@/lib/store';
import { translations, Language } from '@/lib/translations';

export default function Home() {
  const { language } = useUserStore();
  const t = translations[language as Language];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                🚀 AI-Powered Agriculture
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-700">
                {t.heroTitle}
              </h1>
              <p className="text-xl text-muted-foreground max-w-[42rem] leading-relaxed">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto gap-2 text-lg h-12 px-8">
                    {t.startJourney} <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-12 px-8">
                    {t.learnMore}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          {/* Removed floating decorative element */}
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t.feature1Title}</h3>
                <p className="text-muted-foreground">
                  {t.feature1Desc}
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <TrendingUp className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t.feature2Title}</h3>
                <p className="text-muted-foreground">
                  {t.feature2Desc}
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="h-14 w-14 rounded-full bg-yellow-100 flex items-center justify-center mb-6">
                  <CloudSun className="h-7 w-7 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t.feature3Title}</h3>
                <p className="text-muted-foreground">
                  {t.feature3Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {t.ctaTitle}
                </h2>
                <p className="text-primary-foreground/80 text-lg">
                  {t.ctaDesc}
                </p>
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="mt-4 text-primary font-bold">
                    {t.createAccount}
                  </Button>
                </Link>
              </div>
              <Sprout className="absolute -bottom-12 -right-12 h-64 w-64 text-primary-foreground/10 rotate-12" />
              <Sprout className="absolute -top-12 -left-12 h-64 w-64 text-primary-foreground/10 -rotate-12" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


