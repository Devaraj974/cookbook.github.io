# CookBook - Your Personal Recipe Library

A modern web application for discovering and managing recipes from various cuisines around the world. Built with React, Vite, and Supabase.

## Features

- **Authentication System**: Secure user authentication with email/password
- **Recipe Management**: Browse, search, and filter recipes by cuisine
- **Voice Control**: Voice-guided cooking instructions with text-to-speech
- **Ingredient Matching**: Find recipes based on available ingredients
- **User Profiles**: Personalized profiles with favorite recipes
- **Responsive Design**: Beautiful UI that works on all devices

## Tech Stack

- React 18
- Vite
- Supabase
- TailwindCSS
- Framer Motion
- React Router
- Web Speech API

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cookbook.git
   cd cookbook
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
cookbook/
├── src/
│   ├── components/    # Reusable UI components
│   ├── contexts/      # React contexts
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and configurations
│   ├── pages/         # Page components
│   └── data/          # Static data and services
├── public/            # Static assets
└── supabase/         # Supabase configurations and migrations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.