import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import CTA from './components/sections/CTA';
import Footer from './components/sections/Footer';
import SectionDivider from './components/effects/SectionDivider';
import Features from './components/sections/Features';
import Performance from './components/sections/Performance';
import Experience from './components/sections/Experience';
import './App.css';

function App() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
            <Navbar />
            <Hero />
            <Performance />
            <SectionDivider label="About" />
            <About />
            <SectionDivider label="Features" />
            <Features />
            <SectionDivider label="Community" />
            <Experience />
            <CTA />
            <Footer />
        </div>
    );
}

export default App;
