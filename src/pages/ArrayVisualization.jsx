import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

const ArrayVisualization = () => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const cubesRef = useRef([]);
    const animationIdRef = useRef(null);
    const selectedIndexRef = useRef(-1); // 1. Create the ref

    const [arrayData, setArrayData] = useState([5, 3, 8, 1, 9, 2, 7, 4, 6]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [operation, setOperation] = useState('');

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 5, 10);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        scene.add(directionalLight);

        // Animation loop
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);

            // Rotate cubes slightly for visual appeal
            cubesRef.current.forEach((cube, index) => {
                if (cube) {
                    cube.rotation.y += 0.005;

                    // 3. Highlight selected cube by reading from the ref
                    if (index === selectedIndexRef.current) {
                        cube.position.y = Math.sin(Date.now() * 0.01 + index) * 0.5 + 1;
                        cube.material.emissive.setHex(0x444444);
                    } else {
                        cube.position.y = 0; // Half height for proper ground positioning
                        cube.material.emissive.setHex(0x000000);
                    }
                }
            });

            renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            if (mountRef.current && camera && renderer) {
                camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []); // Only run once on mount

    // Separate useEffect for creating cubes when arrayData changes
    useEffect(() => {
        if (!sceneRef.current) return;

        // Clear existing cubes
        cubesRef.current.forEach(cube => {
            if (cube && sceneRef.current) {
                sceneRef.current.remove(cube);
            }
        });
        cubesRef.current = [];

        // Create new cubes
        arrayData.forEach((value, index) => {
            const geometry = new THREE.BoxGeometry(1, value * 0.3, 1);
            const material = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL((value * 0.1) % 1, 0.7, 0.6),
                emissive: 0x000000,
                emissiveIntensity: 1
            });

            const cube = new THREE.Mesh(geometry, material);
            cube.position.x = (index - arrayData.length / 2) * 1.5;
            cube.position.y = 0;
            cube.castShadow = true;
            cube.receiveShadow = true;

            // Add index label
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 64;
            canvas.height = 64;
            context.fillStyle = 'white';
            context.font = '20px Arial';
            context.textAlign = 'center';
            context.fillText(value.toString(), 32, 40);

            const texture = new THREE.CanvasTexture(canvas);
            const labelMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true
            });

            const labelGeometry = new THREE.PlaneGeometry(0.8, 0.8);
            const label = new THREE.Mesh(labelGeometry, labelMaterial);
            const label2 = new THREE.Mesh(labelGeometry, labelMaterial);
            label.position.set(0, value * 0.15 + 0.5, 0.51);
            label2.position.set(0, value * 0.15 + 0.5, -0.51);
            cube.add(label);
            cube.add(label2);

            sceneRef.current.add(cube);
            cubesRef.current.push(cube);
        });
    }, [arrayData]); // Only run when arrayData changes

    // 2. Update the ref whenever the selectedIndex state changes
    useEffect(() => {
        selectedIndexRef.current = selectedIndex;
    }, [selectedIndex]);

    const handleArrayOperation = (op) => {
        setOperation(op);
        switch (op) {
            case 'sort':
                const sorted = [...arrayData].sort((a, b) => a - b);
                animateSort(sorted);
                break;
            case 'reverse':
                setArrayData([...arrayData].reverse());
                break;
            case 'shuffle':
                const shuffled = [...arrayData];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                setArrayData(shuffled);
                break;
            case 'reset':
                setArrayData([5, 3, 8, 1, 9, 2, 7, 4, 6]);
                setSelectedIndex(-1);
                break;
        }
    };

    const animateSort = (sortedArray) => {
        // Simple sort animation - in a real implementation, you'd show the sorting process
        setTimeout(() => {
            setArrayData(sortedArray);
        }, 500);
    };

    const handleCubeClick = (index) => {
        setSelectedIndex(selectedIndex === index ? -1 : index);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/denniswong-portfolio/dsa"
                            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                        >
                            ← Back to DSA
                        </Link>
                        <h1 className="text-3xl font-bold">Array Visualization</h1>
                    </div>
                </div>

                {/* Control Panel */}
                <div className="bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex flex-wrap gap-3 mb-4">
                        <button
                            onClick={() => handleArrayOperation('sort')}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            Sort Array
                        </button>
                        <button
                            onClick={() => handleArrayOperation('reverse')}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                        >
                            Reverse
                        </button>
                        <button
                            onClick={() => handleArrayOperation('shuffle')}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                        >
                            Shuffle
                        </button>
                        <button
                            onClick={() => handleArrayOperation('reset')}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                        <span>Array: [{arrayData.join(', ')}]</span>
                        {selectedIndex >= 0 && (
                            <span className="text-yellow-400">
                                Selected: Index {selectedIndex}, Value {arrayData[selectedIndex]}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* WebGL Canvas */}
            <div
                ref={mountRef}
                className="absolute inset-0 z-0 items-center justify-center mt-[-700px]"
                style={{ height: '100vh', width: '100vw' }}
            />

            {/* Array Index Clickable Overlay */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex space-x-2">
                    {arrayData.map((value, index) => (
                        <button
                            key={index}
                            onClick={() => handleCubeClick(index)}
                            className={`
                                w-12 h-12 rounded-lg border-2 flex items-center justify-center text-sm font-bold
                                transition-all duration-200 hover:scale-110
                                ${selectedIndex === index
                                ? 'bg-yellow-500 border-yellow-400 text-black shadow-lg shadow-yellow-500/50'
                                : 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'
                            }
                            `}
                        >
                            {index}
                        </button>
                    ))}
                </div>
                <p className="text-center text-gray-400 text-sm mt-2">Click index to select cube</p>
            </div>

            {/* Info Panel */}
            <div className="absolute top-70 right-6 bg-gray-900/80 rounded-lg p-4 backdrop-blur-sm max-w-xs">
                <h3 className="text-lg font-bold mb-3">Array Operations</h3>
                <div className="space-y-2 text-sm">
                    <div><strong>Time Complexity:</strong></div>
                    <div>• Access: O(1)</div>
                    <div>• Search: O(n)</div>
                    <div>• Insertion: O(n)</div>
                    <div>• Deletion: O(n)</div>
                </div>
                <div className="mt-4">
                    <strong>Space Complexity:</strong> O(n)
                </div>
            </div>
        </div>
    );
};

export default ArrayVisualization;