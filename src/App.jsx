import './index.css';
import {LoadingScreen} from "./components/LoadingScreen.jsx";
import {Navbar} from "./components/Navbar.jsx";
import {MobileMenu} from "./components/MobileMenu.jsx";
import {Home} from "./components/sections/Home.jsx";
import {About} from "./components/sections/About.jsx";
import {Projects} from "./components/sections/Projects.jsx";
import {Contacts} from "./components/sections/Contacts.jsx";
import {WorkExperience} from "./components/sections/WorkExperience.jsx";

import DSASelector from "./pages/DSASelector.jsx";
import ArrayVisualization from "./pages/ArrayVisualization.jsx";

import {Chatbot} from "./pages/Chatbot.jsx";
import {WebGPUTest} from "./pages/WebGPUTest.jsx";
import {GraphicsCourse} from "./pages/GraphicsCourse.jsx";
import {Innocence} from "./pages/Innocence.jsx";

import BackgroundRoom from "./pages/BackgroundRoom.jsx";

import {BrowserRouter, HashRouter, Routes, Route, useLocation} from "react-router-dom";
import {useRef, useState} from "react";
import {Canvas, useFrame} from "@react-three/fiber";


// Create a main portfolio page component
function Portfolio() {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full">
                <BackgroundRoom/>
            </div>
            <Home/>
            <About/>
            <WorkExperience />
            <Projects/>
            <Contacts/>
        </>
    );
}

// Layout component that conditionally shows navbar
function Layout({children}) {
    const location = useLocation();
    // Show navbar on portfolio page (root) and exclude specific pages
    const showNavbar = location.pathname === '/' || location.pathname === '/denniswong-portfolio';
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {showNavbar && <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>}
            {showNavbar && <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>}
            {children}
        </>
    );
}

function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)}/>}
            <div
                className={`font-display min-h-screen transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"} bg-black text-gray-100`}>

                <BrowserRouter>
                    <Layout>
                        <Routes>
                            {/* Root route serves the portfolio */}
                            <Route path="/" element={<Portfolio />} />
                            <Route path="/denniswong-portfolio" element={<Portfolio />} />
                            <Route path="/dsa" element={<DSASelector />} />

                            {/* Arrays Route */}
                            <Route path="/dsa/data-structure/array" element={<ArrayVisualization />} />

                            <Route path="/chatbot" element={<Chatbot />} />

                            {/* WebGPU Test Route */}
                            <Route path="/test" element={<WebGPUTest />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App


