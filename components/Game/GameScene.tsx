"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import World from "./World";
import { EffectComposer, Pixelation, Outline, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

function ScrollCamera({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const { camera } = useThree();
  const targetZ = useRef(0);

  useFrame(() => {
    // Map scroll (0 to 1) to World Z position (e.g., 0 to -100)
    const currentScroll = scrollYProgress.get();
    targetZ.current = -currentScroll * 100; // 100 units long world

    // Snappier camera movement (increased lerp factor from 0.1 to 0.3)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ.current + 20, 0.3);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 5, 0.3);
    camera.position.x = 0;
    
    camera.lookAt(0, 0, targetZ.current - 20); // Look ahead
  });

  return null;
}

export default function GameScene({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="w-full h-screen relative">
      <Canvas shadows camera={{ position: [0, 5, 20], fov: 60 }}>
        <fog attach="fog" args={['#87CEEB', 10, 80]} /> 
        <Suspense fallback={null}>
            <color attach="background" args={['#87CEEB']} />
            
            <ambientLight intensity={0.6} />
            <directionalLight 
                position={[10, 10, 5]} 
                intensity={1.5} 
                color={"#ffffff"}
                castShadow
            />

            <ScrollCamera scrollYProgress={scrollYProgress} />
            <World />
            
            {/* Post-processing for comic pixel look */}
            <EffectComposer>
                <Pixelation granularity={4} />
                <Bloom 
                    intensity={0.3} 
                    luminanceThreshold={0.9} 
                    luminanceSmoothing={0.9}
                />
            </EffectComposer>
        </Suspense>
      </Canvas>
      
      {/* Comic-style overlay elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Halftone/comic dots overlay */}
        <div 
          className="w-full h-full opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
            backgroundSize: '4px 4px'
          }}
        />
      </div>

      {/* Comic text bubble hint */}
      <div className="absolute top-8 left-8 bg-white border-4 border-black rounded-2xl p-4 font-['Comic_Sans_MS'] text-black font-bold max-w-xs pointer-events-none">
        <div className="relative">
          <p className="text-sm">Scroll down to explore!</p>
          <div 
            className="absolute -bottom-6 left-4 w-0 h-0"
            style={{
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: '16px solid black'
            }}
          />
          <div 
            className="absolute -bottom-[22px] left-4 w-0 h-0"
            style={{
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '14px solid white'
            }}
          />
        </div>
      </div>
    </div>
  );
}
