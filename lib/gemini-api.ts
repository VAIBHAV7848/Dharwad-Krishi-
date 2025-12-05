// Gemini AI Integration
export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export async function sendToGemini(
    messages: Message[],
    systemPrompt?: string
): Promise<string> {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
        console.error('Gemini API key not configured');
        return 'Sorry, AI assistant is not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your environment variables.';
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `${systemPrompt ? systemPrompt + '\n\n' : ''}
                                    IMPORTANT: If the user speaks in Kannada or Hindi, reply in the SAME language. 
                                    For Kannada, use natural, conversational Kannada (spoken style/colloquial) rather than formal bookish Kannada.
                                    Make it sound like a friendly local farmer friend speaking.
                                    
                                    ${messages.map(m => `${m.role}: ${m.content}`).join('\n')}\nassistant:`
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1024,
                    }
                }),
            }
        );

        const data = await response.json();

        if (data.error) {
            console.error('Gemini API Error Details:', JSON.stringify(data.error, null, 2));
            return `AI Error: ${data.error.message || 'Unknown error'}`;
        }

        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }

        console.error('Unexpected Gemini Response Structure:', JSON.stringify(data, null, 2));
        return 'Sorry, I could not generate a response. Please try again.';
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return 'Sorry, there was an error processing your request. Please try again later.';
    }
}

// Specialized Gemini functions for different features
export async function analyzeImage(base64Image: string, prompt: string): Promise<string> {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
        return 'Image analysis not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY.';
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: prompt },
                                {
                                    inline_data: {
                                        mime_type: 'image/jpeg',
                                        data: base64Image.split(',')[1] // Remove data:image/jpeg;base64, prefix
                                    }
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.4,
                        maxOutputTokens: 2048,
                    }
                }),
            }
        );

        const data = await response.json();

        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }

        return 'Could not analyze the image. Please try again.';
    } catch (error) {
        console.error('Error analyzing image:', error);
        return 'Error analyzing image. Please try again later.';
    }
}

export async function getCropSuggestions(farmData: {
    soilType: string;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    ph: number;
}): Promise<string> {
    const prompt = `As an agricultural expert, suggest the top 3 most suitable crops for the following farm conditions:
  
Soil Type: ${farmData.soilType}
Nitrogen (N): ${farmData.nitrogen} kg/ha
Phosphorus (P): ${farmData.phosphorus} kg/ha
Potassium (K): ${farmData.potassium} kg/ha
pH Level: ${farmData.ph}

For each crop, provide:
1. Crop name
2. Expected yield
3. Growing duration
4. Water requirements
5. Why it's suitable for these conditions

Format the response as JSON with this structure:
{
  "crops": [
    {
      "name": "Crop Name",
      "confidence": 95,
      "yield": "Expected yield",
      "duration": "Duration in days",
      "water": "Water requirement level",
      "climate": "Suitable climate",
      "reason": "Why this crop is suitable"
    }
  ]
}`;

    const response = await sendToGemini([{ role: 'user', content: prompt }]);
    return response;
}

export async function analyzeDiseaseImage(base64Image: string): Promise<string> {
    const prompt = `You are an expert agricultural pathologist. Analyze this crop/plant image and identify any diseases, pests, or health issues.

Provide your analysis in the following JSON format:
{
  "disease": "Disease name or 'Healthy' if no disease detected",
  "severity": "Low/Medium/High or N/A if healthy",
  "confidence": 85,
  "symptoms": ["symptom1", "symptom2"],
  "treatment": "Detailed treatment recommendations",
  "prevention": "Prevention tips for future"
}

Be specific and provide actionable advice for farmers.`;

    return analyzeImage(base64Image, prompt);
}
