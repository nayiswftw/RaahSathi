# RaahSathi - Your AI Travel Companion

RaahSathi is an intelligent travel planning application that helps you create personalized trip itineraries using AI technology.

## Features

- **AI-Powered Trip Planning**: Create custom travel itineraries based on your preferences
- **Smart Recommendations**: Get suggestions for:
  - Daily activities and itineraries
  - Hotels and accommodations 
  - Tourist spots and attractions
  - Local restaurants
  - Weather information
- **Interactive Interface**: Beautiful, responsive UI with carousel displays and animations
- **Budget-Friendly Options**: Plan trips across different budget ranges (Economy, Moderate, Luxury)
- **Travel Companions**: Customize plans based on whether you're traveling solo, with family, or friends

## Technology Stack

- **Frontend**: React + Vite
- **UI Components**: 
  - Radix UI for accessible components
  - Tailwind CSS for styling
  - Embla Carousel for image sliders
- **AI Integration**: Google's Generative AI
- **Backend/Database**: Firebase/Firestore
- **Build Tool**: Vite

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Build for production:
```bash
pnpm build
```

## Project Structure

- `/src` - Source code
  - `/components` - React components
    - `/custom` - Custom components
    - `/ui` - UI components
  - `/pages` - Main application pages
  - `/lib` - Utilities and configuration
  - `/hooks` - Custom React hooks

## Environment Variables

Create a `.env.local` file with necessary Firebase and Google AI configuration.
