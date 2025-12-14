# Fiction Development

> **"Making Imagination Reality."**

Fiction Development is a cutting-edge web experience that combines minimalist aesthetics with high-performance engineering. Designed with a "weightless" philosophy, this project showcases a modern approach to software development agencies, featuring immersive animations, a dynamic particle system, and a seamless dark/light mode experience.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-19.x-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)
![Vite](https://img.shields.io/badge/vite-7.x-yellow.svg)
![Tailwind](https://img.shields.io/badge/tailwind-4.x-38b2ac.svg)

## ✨ Key Features

- **🌓 Dynamic Dark/Light Mode**: A deeply integrated theme system that adjusts not just colors, but background particle physics and blending modes.
- **🌌 Immersive Particle System**: Custom HTML5 Canvas-based background with interactive particles that react to theme changes (Screen blend for dark, Multiply for light).
- **🖱️ Parallax Interactions**: Mouse-aware parallax effects in the Hero section using `framer-motion-springs`.
- **🤸 Interactive 3D Service Cards**: "Flip" functionality on service cards to reveal technical specs and real-world case studies on the back face.
- **📜 Scroll-Linked Animations**: Process timeline and section reveals triggered by scroll position using Framer Motion.
- **💅 Glassmorphism Design**: Extensive use of backdrop extraction and varying opacity layers for a premium, modern feel.

## 🛠 Tech Stack

Built with a focus on **Developer Experience (DX)** and **Performance**:

- **Core**: React 19, TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 (Beta), PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Quality Assurance**: ESLint, Prettier (Enforced 2-space indentation)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (Version `20.19.0+` or `22.12.0+` recommended for Vite 7)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/JimmyDLA/fiction-dev.git
    cd fiction-dev
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` directory.

## 📂 Project Structure

```bash
src/
├── components/
│   ├── Layout/          # Navbar, Footer, ParticleBackground
│   └── Sections/        # Hero, Services, Process, About, Contact
├── lib/
│   ├── theme.tsx        # ThemeProvider context & hooks
│   └── utils.ts         # Helper functions
├── index.css            # Global styles & Tailwind directives
├── App.tsx              # Main application entry
└── main.tsx             # React DOM root
```

## 🎨 Design Philosophy

### The "Weightless" Aesthetic
We moved away from heavy containers and solid backgrounds. Instead, content "floats" on the screen.
- **Typography**: Uses **Inter** with tight tracking for headlines to create a solid visual anchor.
- **Motion**: Everything has an entry animation. Nothing simply "appears"; it fades, slides, or scales into existence.
- **Depth**: Shadows are colored (not just black) to create a sense of glowing depth, especially in dark mode.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Built with ❤️ by Fiction Development Team.*
