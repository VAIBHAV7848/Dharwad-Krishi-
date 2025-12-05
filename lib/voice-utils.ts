// Voice recognition utilities using Web Speech API
export class VoiceRecognition {
    private recognition: any;
    private isListening: boolean = false;

    constructor() {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

            if (SpeechRecognition) {
                this.recognition = new SpeechRecognition();
                this.recognition.continuous = false;
                this.recognition.interimResults = false;
                this.recognition.maxAlternatives = 1;
            }
        }
    }

    isSupported(): boolean {
        return !!this.recognition;
    }

    setLanguage(lang: 'en' | 'kn' | 'hi') {
        if (this.recognition) {
            const langMap = {
                en: 'en-IN',
                kn: 'kn-IN',
                hi: 'hi-IN'
            };
            this.recognition.lang = langMap[lang];
        }
    }

    start(
        onResult: (text: string) => void,
        onError?: (error: string) => void
    ): void {
        if (!this.recognition) {
            onError?.('Speech recognition not supported in this browser');
            return;
        }

        if (this.isListening) {
            return;
        }

        this.recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
            this.isListening = false;
        };

        this.recognition.onerror = (event: any) => {
            onError?.(event.error);
            this.isListening = false;
        };

        this.recognition.onend = () => {
            this.isListening = false;
        };

        try {
            this.recognition.start();
            this.isListening = true;
        } catch (error) {
            onError?.('Failed to start speech recognition');
            this.isListening = false;
        }
    }

    stop(): void {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
        }
    }

    getIsListening(): boolean {
        return this.isListening;
    }
}

// Text-to-speech utilities
export class TextToSpeech {
    private synthesis: SpeechSynthesis | null = null;
    private voices: SpeechSynthesisVoice[] = [];

    constructor() {
        if (typeof window !== 'undefined') {
            this.synthesis = window.speechSynthesis;

            // Load voices immediately if available
            if (this.synthesis) {
                this.voices = this.synthesis.getVoices();

                // Chrome loads voices asynchronously
                this.synthesis.onvoiceschanged = () => {
                    this.voices = this.synthesis!.getVoices();
                };
            }
        }
    }

    isSupported(): boolean {
        return !!this.synthesis;
    }

    speak(text: string, lang: 'en' | 'kn' | 'hi' = 'en'): void {
        if (!this.synthesis) {
            return;
        }

        // Cancel any ongoing speech
        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const langCode = {
            en: 'en-IN',
            kn: 'kn-IN',
            hi: 'hi-IN'
        }[lang];

        utterance.lang = langCode;
        utterance.rate = 0.9;
        utterance.pitch = 1;

        // Ensure voices are loaded
        if (this.voices.length === 0) {
            this.voices = this.synthesis.getVoices();
        }

        // Try to find a voice that matches the language
        // 1. Exact match (e.g., kn-IN)
        // 2. Language match (e.g., kn)
        // 3. Fallback for Indian languages: Try Hindi voice for Kannada if Kannada not found (better than English)
        let matchingVoice = this.voices.find(voice => voice.lang === langCode);

        if (!matchingVoice) {
            matchingVoice = this.voices.find(voice => voice.lang.startsWith(langCode.split('-')[0]));
        }

        // Fallback: If Kannada voice not found, try to find a Google Hindi voice or any Indian voice
        // This often helps on Android/Chrome where specific regional voices might be hidden but "Google Indic" exists
        if (!matchingVoice && (lang === 'kn' || lang === 'hi')) {
            matchingVoice = this.voices.find(voice => voice.lang.includes('hi-IN') || voice.name.includes('India') || voice.name.includes('Hindi'));
        }

        if (matchingVoice) {
            utterance.voice = matchingVoice;
        }

        this.synthesis.speak(utterance);
    }

    stop(): void {
        if (this.synthesis) {
            this.synthesis.cancel();
        }
    }
}
