# 🔑 API Keys Setup - Quick Guide

## Required API Keys

### 1. Google Gemini API (AI Features)

**Free Tier:** 60 requests/minute

**Steps:**
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Select "Create API key in new project"
5. Copy the generated key

**Add to `.env.local`:**
```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

---

### 2. Weather API (Open-Meteo)

**Status:** ✅ **Completely Free & No Key Required!**

We have switched to Open-Meteo API which is open-source and free for non-commercial use. You do **NOT** need an API key for weather data anymore.

---

## Complete `.env.local` File

Create this file in your project root (`d:/Num/krishi-mitra-ai/.env.local`):

```env
# Google Gemini API - Get from https://makersuite.google.com/app/apikey
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here
```

---

## After Adding Keys

**IMPORTANT:** Restart the development server:

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## Testing Your Setup

### Test Weather API (No Key Needed):
1. Go to http://localhost:3000/farmer
2. Check weather widget
3. Should show real weather data immediately

### Test Gemini AI (Needs Key):
1. Go to http://localhost:3000/farmer/assistant
2. Ask a question: "What is the best time to plant tomatoes?"
3. Should get AI response

---

## Troubleshooting

### AI not responding:
- Verify Gemini API key is correct
- Check quota (60 requests/minute)
- Restart development server

---

**✨ You now have a fully functional AI-powered agricultural platform!**
