# zaidxshaikh News - Live Breaking News

A modern, futuristic live news platform built with React. Features AI-powered tools, glassmorphism UI, dark/light themes, and real-time news from 7+ categories.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Features

### UI / Design
- Glassmorphism navbar with frosted blur effect
- Dark / Light theme toggle (saved in localStorage)
- Animated news cards with hover lift & image zoom
- Featured hero card for top story (horizontal layout)
- Category pill navigation with active indicators
- Staggered fade-in animations on load
- CSS-only spinner (no GIF)
- Fully responsive - mobile, tablet, desktop
- Custom scrollbar & gradient ambient backgrounds
- Back to top button

### AI-Powered Features
- **AI Chatbot (zaidxshaikh AI)** - Floating chat assistant that answers questions about current headlines, finds articles by keyword, shows trending stories, and lists sources
- **AI Summary** - One-click summary on every news card with sentiment analysis (positive/neutral/critical), read time estimate, and key insights
- **Trending Topics** - Auto-extracted keywords from articles displayed as clickable filter tags
- **People Also Read** - Smart article recommendations based on title keyword similarity

### Core Functionality
- 7 news categories: General, Business, Entertainment, Health, Science, Sports, Technology
- Real-time search filtering from navbar
- Infinite scroll pagination
- Top loading bar on page transitions
- Demo mode with sample data when no API key is set
- Article stats (total articles, sources, showing count)
- Error handling with friendly UI states

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| React Router v6 | Client-side routing |
| Vite 5 | Build tool & dev server |
| NewsAPI.org | Live news data |
| CSS3 (Custom) | Glassmorphism, animations, themes |
| Infinite Scroll | Pagination |

> No Bootstrap, no Tailwind - 100% custom CSS with CSS variables for theming.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/zaidxshaikh/React-Live-News.git
cd React-Live-News/NewsApp
npm install
```

### Setup API Key (Optional)

Get a free API key from [newsapi.org](https://newsapi.org/) and create a `.env` file:

```env
VITE_NEWS_API=your_api_key_here
```

> Without an API key, the app runs in **Demo Mode** with sample articles.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
NewsApp/
├── src/
│   ├── components/
│   │   ├── NavBar.jsx          # Glassmorphism navbar with search & theme toggle
│   │   ├── CategoryNav.jsx     # Category pills with active state
│   │   ├── News.jsx            # Main news feed with infinite scroll
│   │   ├── NewsItem.jsx        # Individual news card
│   │   ├── AiChatbot.jsx       # Floating AI chat assistant
│   │   ├── AiSummary.jsx       # AI summary with sentiment analysis
│   │   ├── TrendingTopics.jsx  # Auto-extracted trending keywords
│   │   ├── PeopleAlsoRead.jsx  # Smart recommendations
│   │   ├── Spinner.jsx         # CSS-only loading spinner
│   │   ├── BackToTop.jsx       # Scroll-to-top button
│   │   └── Footer.jsx          # Site footer
│   ├── data/
│   │   └── demoNews.js         # Demo articles for all categories
│   ├── App.jsx                 # Root component with routing
│   ├── App.css
│   ├── index.css               # Full design system (themes, components)
│   └── main.jsx                # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## Screenshots

### Dark Mode
> Glassmorphism cards, gradient backgrounds, animated UI

### Light Mode
> Clean white theme with subtle shadows

### AI Chatbot
> Ask about news, get instant answers from loaded articles

### AI Summary
> One-click article analysis with sentiment & key insights

---

## Author

**Zaid Shaikh** - [@zaidxshaikh](https://github.com/zaidxshaikh)

---

## License

This project is open source and available under the [MIT License](LICENSE).
