# Google Ads AI Assistant - Prototype

A functional prototype demonstrating a SaaS tool that lets users chat with their Google Ads performance data using Claude AI.

## Features

- **AI-Powered Analysis**: Chat naturally with Claude to analyze ad performance
- **Mock Google Ads Data**: Realistic campaign and keyword performance data
- **Function Calling**: Claude uses tools to query specific data points
- **Clean UI**: Modern, responsive interface built with Next.js and TailwindCSS
- **Example Prompts**: Pre-built scenarios to demonstrate capabilities

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript**
- **TailwindCSS v4**
- **Claude AI** (Anthropic SDK)
- **Radix UI** components
- **Lucide Icons**
- **Recharts** (ready for visualizations)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env
```

Add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_actual_api_key_here
```

Get your API key from: https://console.anthropic.com/

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Scenarios

Try these example prompts:

1. **"Show me my top performing campaigns by ROAS"**
   - Demonstrates data querying and analysis

2. **"Which campaigns are spending the most and what is their performance?"**
   - Shows budget analysis capabilities

3. **"What can I do to improve my overall campaign performance?"**
   - Demonstrates AI-powered recommendations

4. **"Show me my best and worst performing keywords"**
   - Keyword-level analysis

## Project Structure

```
src/
├── app/
│   ├── api/chat/          # Claude AI API endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main chat interface
├── components/
│   ├── chat-input.tsx     # Message input component
│   ├── chat-message.tsx   # Message bubble component
│   └── example-prompts.tsx # Demo prompt suggestions
└── lib/
    ├── mock-data.ts       # Mock Google Ads data
    └── claude-tools.ts    # Claude function definitions
```

## How It Works

1. **User asks a question** via the chat interface
2. **Claude analyzes** the question and determines which tools to use
3. **Function calling** executes queries against mock ad data
4. **Claude synthesizes** results into actionable insights
5. **Response displayed** in conversational format

## Mock Data Overview

The prototype includes realistic mock data for:

- **5 campaigns** with varying performance (ENABLED/PAUSED)
- **7 keywords** across different campaigns
- Performance metrics: impressions, clicks, CTR, CPC, conversions, ROAS, etc.
- Campaign types: seasonal promos, brand awareness, retargeting, competitor

## Next Steps (For Full MVP)

- [ ] Real Google OAuth 2.0 authentication
- [ ] Live Google Ads API integration
- [ ] Database for storing user sessions and tokens
- [ ] Account switching for MCC support
- [ ] Real-time data caching
- [ ] Enhanced visualizations (charts, graphs)
- [ ] Export functionality
- [ ] Rate limiting and error handling
- [ ] Deployment to Vercel

## Development Notes

This is a **prototype** built for demonstration purposes. It uses:
- Mock data instead of real Google Ads API
- No authentication system
- In-memory conversation (no persistence)
- Simplified error handling

Perfect for showcasing the core value proposition and user experience!

## License

MIT
