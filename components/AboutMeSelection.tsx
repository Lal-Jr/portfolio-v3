"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	Image as ThreeImage,
	ContactShadows,
	Html,
	Environment,
	Billboard,
} from "@react-three/drei";
import * as THREE from "three";

const STRENGTHS = [
	{ text: "CRITICAL THINKER", color: "#facc15" },
	{ text: "PIXEL PERFECT", color: "#22d3ee" },
	{ text: "TS WIZARD", color: "#4ade80" },
	{ text: "COFFEE ADDICT", color: "#ef4444" },
	{ text: "NIGHT OWL", color: "#a855f7" },
];

function OrbitingStrengths() {
	const groupRef = useRef<THREE.Group>(null!);

	useFrame((state) => {
		// Rotating the group makes everything inside it orbit the center (0,0,0)
		groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
	});

	return (
		<group ref={groupRef} position={[0, 0.5, 0]}>
			{STRENGTHS.map((item, i) => {
				const angle = (i / STRENGTHS.length) * Math.PI * 2;
				const radius = 3.5; // Adjusted to be closer to the character
				const x = Math.cos(angle) * radius;
				const z = Math.sin(angle) * radius;

				return (
					<group key={i} position={[x, 0, z]}>
						{/* Billboard inside the orbit ensures the text always faces the user while moving */}
						<Billboard>
							<Html
								occlude
								center
								distanceFactor={10} // Adjusts scale based on distance
							>
								<div
									className="p-3 border-4 border-black shadow-[4px_4px_0px_#000] font-black italic uppercase whitespace-nowrap select-none pointer-events-none"
									style={{
										backgroundColor: item.color,
										transform: "skewX(-10deg)", // Added a comic-book lean
									}}
								>
									{item.text}
								</div>
							</Html>
						</Billboard>
					</group>
				);
			})}
		</group>
	);
}

export default function ComicHeroScene() {
	return (
		<div className="w-full">
			<Canvas camera={{ position: [8, 5, 10], fov: 35 }}>
				<ambientLight intensity={0.7} />
				<pointLight position={[10, 10, 10]} />

				{/* --- 1. THE 3D PODIUM (Horizontal Plane) --- */}
				<group position={[0, -2, 0]}>
					<mesh receiveShadow>
						<cylinderGeometry args={[3, 3.2, 0.8, 24]} />
						<meshStandardMaterial color="white" />
					</mesh>
					{/* Black Outline for the Podium */}
					<mesh scale={[1.02, 1, 1.02]}>
						<cylinderGeometry args={[3, 3.2, 0.75, 24]} />
						<meshBasicMaterial
							color="black"
							side={THREE.BackSide}
						/>
					</mesh>
				</group>

				<Billboard
					follow={true} // Always faces the camera
					lockX={false}
					lockY={false}
					lockZ={false}
					position={[0, 0.5, 0]}
				>
					{/* Main PNG Avatar */}
					<ThreeImage
						url="/avatars/IMG_7729.png" // Pointing to your PNG
						transparent
						scale={[3, 5]} // Adjust scale to match your PNG's aspect ratio
					/>

					<meshBasicMaterial
						color="black"
						transparent={true}
						opacity={0.5} // 0.5 is 50% see-through
					/>
				</Billboard>

				{/* --- 3. THE PERPENDICULAR ORBIT --- */}
				<OrbitingStrengths />

				{/* Realistic Shadows on the Podium */}
				<ContactShadows
					position={[0, -1.6, 0]}
					opacity={0.4}
					scale={10}
					blur={2}
					far={4}
				/>

				<Environment preset="city" />
			</Canvas>
		</div>
	);
}
