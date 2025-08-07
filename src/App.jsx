import './index.css';
import './App.css';
import {LoadingScreen} from "./components/LoadingScreen.jsx";
import {Navbar} from "./components/Navbar.jsx";
import {MobileMenu} from "./components/MobileMenu.jsx";
import {Home} from "./components/sections/Home.jsx";
import {About} from "./components/sections/About.jsx";
import {Projects} from "./components/sections/Projects.jsx";
import {Contacts} from "./components/sections/Contacts.jsx";

import DSASelector from "./pages/DSASelector.jsx";
import ArrayVisualization from "./pages/ArrayVisualization.jsx";
import LinkedListVisualizer from "./pages/LinkedListVisualizer.jsx";

import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import {useRef, useState} from "react";
import {Canvas, useFrame} from "@react-three/fiber";


// Create a main portfolio page component
function Portfolio() {
    return (
        <>
            <Home />
            <About />
            <Projects />
            <Contacts />
        </>
    );
}

// Layout component that conditionally shows navbar
function Layout({ children }) {
    const location = useLocation();
    const isDSAPage = location.pathname.startsWith('/denniswong-portfolio/dsa/');
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {!isDSAPage && <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>}
            {!isDSAPage && <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>}
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
                            <Route path="/denniswong-portfolio" element={<Portfolio />} />
                            <Route path="/denniswong-portfolio/dsa" element={<DSASelector />} />
                            {/*<Route path="/denniswong-portfolio/dsa/:type/:id" element={<div className="min-h-screen pt-20 px-6 text-center"><h1 className="text-4xl">DSA Content Coming Soon!</h1></div>} />*/}
                            <Route path="/denniswong-portfolio/dsa/data-structure/array" element={<ArrayVisualization />} />
                            <Route path="/denniswong-portfolio/dsa/data-structure/linked-list" element={<LinkedListVisualizer />} />
                            {/* Add more routes here */}
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App