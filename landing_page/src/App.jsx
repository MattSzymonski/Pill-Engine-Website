import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import CTA from './components/sections/CTA';
import Footer from './components/sections/Footer';
import Support from './components/sections/Support';
import Iteration from './components/sections/Iteration';
import PillLabs from './components/sections/PillLabs';
import Roadmap from './components/sections/Roadmap';
import Sponsor from './components/sections/Sponsor';

function App() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
            <Navbar />
            <Hero />
            <Support />
            <Iteration />
            <PillLabs />
            <Roadmap />
            <Sponsor />
            <CTA />
            <Footer />
        </div>
    );
}

export default App;
