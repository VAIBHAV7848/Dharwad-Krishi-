import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import '@testing-library/jest-dom'

// Mock the router
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
            replace: jest.fn(),
            prefetch: jest.fn(),
        };
    },
    usePathname() {
        return '';
    },
}));

// Mock the store and translations
jest.mock('@/lib/store', () => ({
    useUserStore: () => ({
        language: 'en',
        setLanguage: jest.fn(),
    }),
}));

jest.mock('@/lib/translations', () => ({
    translations: {
        en: {
            heroTitle: 'Empowering Farmers with AI',
            heroSubtitle: 'Smart farming solutions for a better future',
            startJourney: 'Start Journey',
            learnMore: 'Learn More',
            feature1Title: 'Disease Detection',
            feature1Desc: 'Detect crop diseases early with AI',
            feature2Title: 'Market Insights',
            feature2Desc: 'Get real-time market prices',
            feature3Title: 'Weather Forecast',
            feature3Desc: 'Accurate weather predictions',
            ctaTitle: 'Ready to modernize your farm?',
            ctaDesc: 'Join thousands of farmers using KrishiMitraAI',
            createAccount: 'Create Account'
        }
    },
    Language: 'en'
}));

describe('Home Page', () => {
    it('renders the main heading', () => {
        render(<Home />)

        const heading = screen.getByText(/Empowering Farmers with AI/i)
        expect(heading).toBeInTheDocument()
    })
})
