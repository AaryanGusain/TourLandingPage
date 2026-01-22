/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { useFBO, MeshTransmissionMaterial, Text } from '@react-three/drei';
import { easing } from 'maath';

/**
 * GlassText Component
 * Creates a 3D glass lens effect over text
 */
export function GlassText({
    children,
    className = '',
    lensScale = 0.2,
    ior = 1.15,
    thickness = 5,
    chromaticAberration = 0.06,
    anisotropy = 0.01
}) {
    return (
        <div className={`relative ${className}`} style={{ minHeight: '120px' }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                style={{ position: 'absolute', inset: 0 }}
            >
                <GlassScene
                    text={children}
                    lensScale={lensScale}
                    ior={ior}
                    thickness={thickness}
                    chromaticAberration={chromaticAberration}
                    anisotropy={anisotropy}
                />
            </Canvas>
        </div>
    );
}

function GlassScene({ text, lensScale, ior, thickness, chromaticAberration, anisotropy }) {
    const lensRef = useRef();
    const buffer = useFBO();
    const { viewport, pointer, camera, gl } = useThree();
    const [scene] = useState(() => new THREE.Scene());

    // Create cylinder geometry for the lens
    const geometry = useMemo(() => {
        return new THREE.CylinderGeometry(1, 1, 0.1, 64);
    }, []);

    useFrame((state, delta) => {
        if (!lensRef.current) return;

        // Follow mouse with smooth easing
        const x = (pointer.x * viewport.width) / 4;
        const y = (pointer.y * viewport.height) / 4;
        easing.damp3(lensRef.current.position, [x, y, 2], 0.15, delta);

        // Render the scene to buffer for transmission effect
        gl.setRenderTarget(buffer);
        gl.render(scene, camera);
        gl.setRenderTarget(null);
    });

    return (
        <>
            {/* Portal the text into a separate scene for the transmission material */}
            {createPortal(
                <Text
                    font="/fonts/Inter-Bold.woff"
                    fontSize={0.5}
                    color="#e3e1d5"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={4}
                    textAlign="center"
                >
                    {text}
                </Text>,
                scene
            )}

            {/* Background plane showing the buffered scene */}
            <mesh scale={[viewport.width, viewport.height, 1]}>
                <planeGeometry />
                <meshBasicMaterial map={buffer.texture} transparent />
            </mesh>

            {/* Glass lens that follows the mouse */}
            <mesh
                ref={lensRef}
                scale={lensScale}
                rotation-x={Math.PI / 2}
                geometry={geometry}
            >
                <MeshTransmissionMaterial
                    buffer={buffer.texture}
                    ior={ior}
                    thickness={thickness}
                    chromaticAberration={chromaticAberration}
                    anisotropy={anisotropy}
                    transmission={1}
                    roughness={0}
                    color="#ffffff"
                />
            </mesh>
        </>
    );
}

/**
 * Simpler CSS-based glass overlay for fallback
 */
export function GlassOverlay({ children, className = '' }) {
    return (
        <div className={`relative ${className}`}>
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

export default GlassText;
