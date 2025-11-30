import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Paragraphs from './components/Paragraphs';
import './App.css';

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#080808] via-zinc-950 to-[#020202] text-white overflow-hidden">
            <Navbar />
            <Hero />
            <About />
            <Paragraphs />
            <CTA />
            <Footer />
        </div>
    );
}

export default App;
