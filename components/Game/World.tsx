"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

function ComicGrid() {
  return (
    <gridHelper 
        args={[200, 50, '#000000', '#333333']} 
        position={[0, -1, -50]} 
    />
  );
}

function ComicRoad() {
    return (
        <>
            {/* Main road */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, -50]}>
                <planeGeometry args={[16, 200]} />
                <meshToonMaterial 
                    color="#444444"
                />
            </mesh>
            {/* Road lines */}
            {Array.from({ length: 20 }).map((_, i) => (
                <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.94, -i * 10]}>
                    <planeGeometry args={[0.5, 4]} />
                    <meshToonMaterial color="#FFFF00" />
                </mesh>
            ))}
        </>
    )
}

// Section milestone marker
function SectionMarker({ 
    position, 
    color, 
    title, 
    number 
}: { 
    position: [number, number, number], 
    color: string, 
    title: string,
    number: number
}) {
    const groupRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if(groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Main pillar */}
            <mesh castShadow>
                <boxGeometry args={[3, 10, 3]} />
                <meshToonMaterial color={color} />
            </mesh>
            
            {/* Top cap */}
            <mesh position={[0, 6, 0]} castShadow>
                <boxGeometry args={[4, 1, 4]} />
                <meshToonMaterial color={color} />
            </mesh>
            
            {/* Section number */}
            <Text
                position={[0, 7, 0]}
                fontSize={1.5}
                color="white"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.1}
                outlineColor="black"
            >
                {number}
            </Text>
            
            {/* Floating rings */}
            <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.2, 8, 16]} />
                <meshToonMaterial color={color} />
            </mesh>
        </group>
    );
}

function FloatingShape({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if(meshRef.current) {
            meshRef.current.rotation.y += 0.01 * speed;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
        }
    })

    return (
        <mesh ref={meshRef} position={position} castShadow>
            <boxGeometry args={[2, 6, 2]} />
            <meshToonMaterial color={color} />
        </mesh>
    )
}

function ComicBuilding({ position, color }: { position: [number, number, number], color: string }) {
    return (
        <mesh position={position} castShadow receiveShadow>
            <boxGeometry args={[3, 8, 3]} />
            <meshToonMaterial color={color} />
        </mesh>
    )
}

export default function World() {
  // Section data matching ContentGrid
  const sections = [
    { title: "BIO", color: "#ec4899", z: -15 },      // 15% scroll
    { title: "LOGS", color: "#f97316", z: -30 },     // 30% scroll
    { title: "TECH", color: "#3b82f6", z: -45 },     // 45% scroll
    { title: "FOCUS", color: "#10b981", z: -60 },    // 60% scroll
    { title: "SKILLS", color: "#eab308", z: -75 },   // 75% scroll
    { title: "COMM", color: "#9333ea", z: -90 },     // 90% scroll
  ];

  return (
    <group>
      {/* Sky-colored ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, -50]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshToonMaterial color="#90EE90" />
      </mesh>

      <ComicRoad />
      <ComicGrid />

      {/* Section milestone markers */}
      {sections.map((section, i) => (
        <SectionMarker
          key={section.title}
          position={[0, 4, section.z]}
          color={section.color}
          title={section.title}
          number={i + 1}
        />
      ))}

      {/* Comic building/pillars along the sides */}
      {Array.from({ length: 8 }).map((_, i) => (
          <group key={i}>
            <ComicBuilding position={[-12, 3, -i * 25]} color={i % 2 === 0 ? "#FF6B6B" : "#4ECDC4"} />
            <ComicBuilding position={[12, 3, -i * 25]} color={i % 2 === 0 ? "#95E1D3" : "#FFE66D"} />
            
            {/* Floating comic elements */}
            <FloatingShape position={[-8, 4, -i * 20 - 10]} color="#FF6B6B" speed={0.8} />
            <FloatingShape position={[8, 4, -i * 20 - 10]} color="#4ECDC4" speed={1.2} />
          </group>
      ))}
    </group>
  );
}
