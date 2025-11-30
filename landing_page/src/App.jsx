import React from 'react';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections//Hero';
import About from './components/sections//About';
import CTA from './components/sections//CTA';
import Footer from './components/sections//Footer';
import Paragraphs from './components/sections//Paragraphs';
import './App.css';

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#080808] via-zinc-950 to-[#020202] text-white overflow-hidden transition-colors duration-300">
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
