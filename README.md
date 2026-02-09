# Portfolio V3

A personal portfolio website built with **Next.js 16**, **Tailwind CSS 4**, and **Framer Motion**.  
Designed with a unique **"Dark Comic" aesthetic**, featuring handwritten elements, rough borders, and immersive interactive storytelling.

## 🎨 Features

### **1. "Dark Comic" Aesthetic**
- **Visual Style**: A distinct blend of handwritten fonts (`Caveat`), pixel typography (`Press Start 2P`), rough scribbles, and a dark, moody palette.
- **Dynamic Elements**: Extensive use of micro-animations, hover effects, and custom SVG paths to create a living, breathing interface.

### **2. Interactive Storytelling**
- **Parallax Timeline**: A "Curve of Life" section that interleaves photos and text in a winding path, using scroll-triggered animations to reveal chapters of my journey.
- **Thought Process Section**: A diamond layout visualization of my design philosophy ("Thinking in Systems"), featuring interactive widgets:
    - **Spacing Widget**: Visualizes layout structure.
    - **Typography Widget**: Showcases font hierarchy.
    - **Color Palette Widget**: Displays the theme colors.
    - **Chat Bubble Widget**: Demonstrates component interactivity.

### **3. Enhanced Project Shelf**
- **Horizontal Scrolling**: A smooth, gesture-friendly showcase of projects.
- **Detail View**: An immersive overlay for each project, detailing "The Problem", "The Thinking" (with a free-form draggable canvas), "The Solution", and "The Impact".

### **4. GitHub Snake Game**
- **Live Contribution Data**: Fetches real-time data from the GitHub API to generate the game grid.
- **Gamified Experience**:
    - **Idle Mode**: A smart AI plays the game automatically when you're not interacting.
    - **Interactive Mode**: Take control with arrow keys to "eat" commits and grow the snake.
    - **Dynamic Scoring**: Tracks commits eaten and resets on crash.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (Scroll, Drag, Layout animations)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: Native Fetch API
- **Utilities**: `tailwind-merge`, `clsx`

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Lal-Jr/portfolio-v3.git
    cd portfolio-v3
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open locally**:
    Visit [http://localhost:3000](http://localhost:3000) to see the portfolio in action.

## 📂 Project Structure

```bash
portfolio-v3/
├── app/                  # Next.js App Router pages and layouts
│   ├── layout.tsx        # Root layout with fonts and metadata
│   └── page.tsx          # Main landing page assembling all sections
├── components/           # Reusable UI components
│   ├── shelf/            # Project Shelf specific components (DetailView, formatting)
│   ├── ui/               # Generic UI elements (StickyNote, ComicBubble, etc.)
│   ├── GitHubGame.tsx    # The contribution graph snake game logic
│   ├── Hero.tsx          # Initial landing section with comic panels
│   ├── StorySection.tsx  # The "Curve of Life" timeline
│   └── ...
├── public/               # Static assets (images, fonts)
├── styles/               # Global styles and Tailwind configuration
└── constants.ts          # Centralized data for projects, timeline, and game config
```

## 🎮 The GitHub Game

The "snake" component in the footer isn't just a static image—it's a playable game that represents my coding journey.

- **AI Autoplay**: Watch the snake wander and find the optimal path to the next commit.
- **Playable**: Press any arrow key to override the AI and play manually.
- **Real Data**: The grid represents actual contribution days from the past year.

---

*Built by [Lal-Jr](https://github.com/Lal-Jr)*
