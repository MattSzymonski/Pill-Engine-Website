import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Showcase from './components/sections/Showcase';
import CTA from './components/sections/CTA';
import Footer from './components/sections/Footer';
import SectionDivider from './components/effects/SectionDivider';
import Features from './components/sections/Features';
import Iteration from './components/sections/Iteration';
import PillLabs from './components/sections/PillLabs';
import Roadmap from './components/sections/Roadmap';
import Sponsor from './components/sections/Sponsor';
import Community from './components/sections/Community';
import Demos from './pages/Demos';

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Showcase />
            <SectionDivider label="Features" />
            <Features />
            <SectionDivider label="Performance" />
            <Iteration />
            <div className="section-divider" />
            <PillLabs />
            <SectionDivider label="Roadmap" />
            <Roadmap />
            <SectionDivider label="Community" />
            <Community />
            <div className="section-divider" />

            <Sponsor />
            <SectionDivider label="Let's go!" />
            <CTA />
            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/demos" element={<Demos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
