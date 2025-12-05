'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Send, Bot, User, Volume2, MicOff } from "lucide-react";
import { cn } from '@/lib/utils';
import { useUserStore } from '@/lib/store';
import { translations, Language } from '@/lib/translations';
import { sendToGemini, Message as AIMessage } from '@/lib/gemini-api';
import { VoiceRecognition, TextToSpeech } from '@/lib/voice-utils';
import toast from 'react-hot-toast';

type Message = {
    id: number;
    role: 'user' | 'assistant';
    text: string;
};

export default function AssistantPage() {
    const { language } = useUserStore();
    const t = translations[language as Language];
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [voiceRecognition] = useState(() => new VoiceRecognition());
    const [textToSpeech] = useState(() => new TextToSpeech());

    useEffect(() => {
        setMessages([
            { id: 1, role: 'assistant', text: t.assistantIntro }
        ]);
    }, [t.assistantIntro]);

    useEffect(() => {
        voiceRecognition.setLanguage(language as 'en' | 'kn' | 'hi');
    }, [language, voiceRecognition]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            // Prepare conversation history for Gemini
            const conversationHistory: AIMessage[] = messages.slice(1).map(m => ({
                role: m.role as 'user' | 'assistant',
                content: m.text
            }));

            conversationHistory.push({ role: 'user', content: input });

            const systemPrompt = `You are Krishi Mitra, a helpful AI assistant for farmers in India. You provide advice on:
- Weather and climate
- Market prices for crops
- Crop diseases and pest management
- Government agricultural schemes
- Best farming practices
- Soil health and fertilizers

IMPORTANT INSTRUCTIONS FOR LANGUAGE:
1. If the user asks in Kannada, you MUST reply in Kannada.
2. If the user asks in Hindi, you MUST reply in Hindi.
3. If the user asks in English, reply in English.

FOR KANNADA/HINDI RESPONSES:
- Use natural, spoken-style language (colloquial/conversational).
- Avoid overly formal or bookish language.
- Speak like a friendly, knowledgeable local farmer.
- Use simple words that are easily understood in rural areas.
- Example (Kannada): Instead of "ತಮ್ಮ ಕೃಷಿ ಚಟುವಟಿಕೆಗಳಿಗೆ...", use "ನಿಮ್ಮ ಹೊಲದ ಕೆಲಸಕ್ಕೆ..."
- Example (Hindi): Instead of "कृषि कार्यों हेतु...", use "खेती-बाड़ी के लिए..."

Current language preference setting: ${language === 'kn' ? 'Kannada' : language === 'hi' ? 'Hindi' : 'English'}`;

            const response = await sendToGemini(conversationHistory, systemPrompt);

            const aiMsg: Message = {
                id: Date.now() + 1,
                role: 'assistant',
                text: response
            };
            setMessages(prev => [...prev, aiMsg]);

            // Auto-speak the response if supported
            if (textToSpeech.isSupported()) {
                textToSpeech.speak(response, language as 'en' | 'kn' | 'hi');
            }
        } catch (error) {
            toast.error('Failed to get AI response. Please try again.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMicClick = async () => {
        if (!voiceRecognition.isSupported()) {
            toast.error('Voice recognition not supported in your browser');
            return;
        }

        if (isListening) {
            voiceRecognition.stop();
            setIsListening(false);
            return;
        }

        setIsListening(true);

        voiceRecognition.start(
            (transcript) => {
                setInput(transcript);
                setIsListening(false);
                toast.success('Voice captured!');
            },
            (error) => {
                setIsListening(false);
                toast.error(`Voice recognition error: ${error}`);
            }
        );
    };

    const speakMessage = (text: string) => {
        if (!textToSpeech.isSupported()) {
            toast.error('Text-to-speech not supported');
            return;
        }
        textToSpeech.speak(text, language as 'en' | 'kn' | 'hi');
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <Card className="flex-1 flex flex-col overflow-hidden">
                <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-6 w-6 text-primary" />
                        {t.aiAssistantTitle}
                        <span className="text-xs text-muted-foreground ml-auto">
                            {voiceRecognition.isSupported() ? '🎤 Voice enabled' : ''}
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex gap-3 max-w-[80%]",
                                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                            )}
                        >
                            <div className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                                msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
                            )}>
                                {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                            </div>
                            <div className={cn(
                                "p-3 rounded-lg text-sm",
                                msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
                            )}>
                                {msg.text}
                                {msg.role === 'assistant' && textToSpeech.isSupported() && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 ml-2 opacity-50 hover:opacity-100"
                                        onClick={() => speakMessage(msg.text)}
                                    >
                                        <Volume2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3 max-w-[80%]">
                            <div className="h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 bg-muted">
                                <Bot className="h-5 w-5" />
                            </div>
                            <div className="p-3 rounded-lg text-sm bg-muted">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </CardContent>
                <div className="p-4 border-t bg-background">
                    <div className="flex gap-2">
                        <Button
                            variant={isListening ? "destructive" : "outline"}
                            size="icon"
                            onClick={handleMicClick}
                            className={isListening ? "animate-pulse" : ""}
                            disabled={isLoading}
                        >
                            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        </Button>
                        <input
                            type="text"
                            className="flex-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder={t.typeOrSpeak}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            disabled={isLoading}
                        />
                        <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
