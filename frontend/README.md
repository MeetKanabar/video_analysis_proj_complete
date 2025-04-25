# ConfidentSpeak - AI-Powered Public Speaking Improvement Tool

ConfidentSpeak is a React application built with Vite that helps users improve their public speaking skills through AI-powered video analysis. The application analyzes videos of users speaking and provides detailed feedback on emotions, eye contact, posture, and audience engagement.

## Features

- **User Authentication**: Secure login and signup with Clerk
- **Video Recording**: Record videos directly in the browser using your webcam
- **Video Upload**: Upload pre-recorded videos for analysis
- **AI Analysis**: Submit videos for comprehensive speaking analysis
- **Detailed Results**: View detailed metrics and visualizations of your speaking performance
- **Dashboard**: Track your progress over time
- **Dark/Light Mode**: Toggle between dark and light themes

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Authentication**: Clerk
- **Routing**: React Router DOM
- **State Management**: Zustand
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **HTTP Requests**: Axios
- **Video Recording**: react-webcam
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/confident-speak.git
   cd confident-speak
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file in the root directory with your Clerk publishable key:
   \`\`\`
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

\`\`\`
src/
├── components/       # Reusable UI components
├── pages/            # Page components
├── store/            # Zustand state management
├── styles/           # Global styles
├── App.tsx           # Main application component
└── main.tsx          # Entry point
\`\`\`

## Backend Integration

The application is designed to connect to a backend API at `http://localhost:3000/api/analyze`. You'll need to implement this API endpoint to process the video files and return analysis results in the expected format.

## Building for Production

To build the application for production:

\`\`\`bash
npm run build
\`\`\`

To preview the production build:

\`\`\`bash
npm run preview
\`\`\`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
