# Pill - Landing Page

A bleeding-edge landing page for Pill project, a data-driven game engine written in Rust.

![Pill](./public/pill-icon.png)

## 🎮 About Pill

Pill is a modern game engine built with Rust, designed for performance, safety, and extensibility. It features a powerful Entity Component System (ECS) architecture and provides everything you need to build amazing games.

### Design Goals

- **Clean and Simple** - Elegant API design that gets out of your way
- **Blazing Fast** - Written in Rust for maximum performance
- **Highly Extensible** - Custom systems, components, and resources

### Features

- ⚡ **Archetype-based Entity Component System** - Modern ECS architecture for optimal performance
- 🎨 **3D Graphics** - Blinn-Phong shading model with instancing support
- 🎬 **Scene System** - Intuitive scene management and transitions
- 🎮 **Input Handling** - Comprehensive keyboard, mouse, and gamepad support
- 🔊 **Sound System** - Play mono and spatial audio
- 📦 **Resource System** - Efficient management of meshes, textures, shaders, materials, and sounds
- 🎨 **Material System** - Advanced material system with custom shader loading
- 🔌 **Custom Extensions** - Create custom systems, components, and resources
- 🔗 **Error Chaining** - Comprehensive error handling
- 🚀 **Launcher Tool** - Streamlined project setup and management
- 🔄 **Hot-Reloading** - Game project hot-reloading for rapid iteration

## 🚀 Tech Stack

- **React** - Modern UI library
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 🎨 Design System

### Colors

- **Pill Cyan** - `#00d4ff` - Primary accent color
- **Pill Purple** - `#b366ff` - Secondary accent color
- **Pill Pink** - `#ff6bd5` - Tertiary accent color
- **Rust Orange** - `#ff6b35` - Rust language highlight

### Features

- Dark mode support
- Smooth animations and transitions
- Gradient text effects
- Glass morphism effects
- Responsive design

## 🛠️ Development

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx          # Landing hero section with animated background
│   ├── About.jsx         # Design goals and core features
│   ├── Features.jsx      # Detailed feature grid
│   ├── Paragraphs.jsx    # Why Rust, ECS info, developer experience
│   ├── CTA.jsx           # Call-to-action with download instructions
│   ├── Footer.jsx        # Footer with links and social media
│   ├── ThemeToggler.jsx  # Dark/light mode toggle
│   └── LightRays.tsx     # Animated light rays effect
├── App.jsx               # Main app component
├── App.css               # Custom styles and animations
├── index.css             # Global styles with Tailwind
└── main.jsx              # App entry point
```

## 🎯 Features Highlights

### Hero Section
- Animated gradient background with light rays
- Prominent call-to-action buttons
- Quick stats showcase

### About Section
- Clean presentation of design goals
- Interactive hover effects on feature cards
- Modern glassmorphism UI

### Features Grid
- 12 comprehensive feature cards
- Icon-based visual representation
- Smooth hover animations

### Developer Experience
- Code snippet examples
- Installation instructions
- Links to documentation and GitHub

### Call-to-Action
- Download instructions
- GitHub integration
- Community highlights

## 🌐 Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

### Recommended Hosting

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## 📝 License

This landing page is built for Pill Engine. Check the Pill Engine repository for license information.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [GitHub](https://github.com/pill-engine)
- [Documentation](#)
- [Discord](#)

---

