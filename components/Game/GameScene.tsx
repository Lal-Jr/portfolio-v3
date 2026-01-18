"use client";

import { MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export default function GameScene({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Section data
    const sections = [
      { title: "BIO", color: "#ec4899", position: 15 },
      { title: "LOGS", color: "#f97316", position: 30 },
      { title: "TECH", color: "#3b82f6", position: 45 },
      { title: "FOCUS", color: "#10b981", position: 60 },
      { title: "SKILLS", color: "#eab308", position: 75 },
      { title: "COMM", color: "#9333ea", position: 90 },
    ];

    // Animation loop
    const animate = () => {
      const scroll = scrollYProgress.get();
      const w = canvas.width;
      const h = canvas.height;

      // Clear canvas
      ctx.fillStyle = "#87CEEB"; // Sky blue
      ctx.fillRect(0, 0, w, h);

      // Draw ground (perspective)
      const horizonY = h * 0.4;
      ctx.fillStyle = "#90EE90"; // Light green
      ctx.fillRect(0, horizonY, w, h - horizonY);

      // Draw road with perspective
      const roadWidth = 300;
      const roadTop = 50;
      const roadBottom = 600;
      
      ctx.fillStyle = "#444444";
      ctx.beginPath();
      ctx.moveTo(w / 2 - roadTop, horizonY);
      ctx.lineTo(w / 2 + roadTop, horizonY);
      ctx.lineTo(w / 2 + roadBottom, h);
      ctx.lineTo(w / 2 - roadBottom, h);
      ctx.closePath();
      ctx.fill();

      // Draw road lines (animated with scroll)
      ctx.strokeStyle = "#FFFF00";
      ctx.lineWidth = 8;
      const lineOffset = (scroll * 1000) % 100;
      
      for (let i = 0; i < 10; i++) {
        const progress = (i * 100 - lineOffset) / 1000;
        if (progress < 0 || progress > 1) continue;
        
        const y = horizonY + (h - horizonY) * progress;
        const width = roadTop + (roadBottom - roadTop) * progress;
        const lineHeight = 30 * (1 + progress * 2);
        
        ctx.fillStyle = "#FFFF00";
        ctx.fillRect(w / 2 - 10, y, 20, lineHeight);
      }

      // Draw grid lines (perspective)
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 1;
      for (let i = 0; i < 20; i++) {
        const progress = i / 20;
        const y = horizonY + (h - horizonY) * progress;
        const width = roadTop + (roadBottom - roadTop) * progress;
        
        ctx.beginPath();
        ctx.moveTo(w / 2 - width * 2, y);
        ctx.lineTo(w / 2 + width * 2, y);
        ctx.stroke();
      }

      // Draw section markers
      sections.forEach((section, index) => {
        const sectionProgress = section.position / 100;
        const distanceFromCamera = Math.abs(scroll - sectionProgress);
        
        // Only draw if close enough
        if (distanceFromCamera < 0.2) {
          const relativePos = (scroll - sectionProgress + 0.2) / 0.4; // 0 to 1
          if (relativePos < 0 || relativePos > 1) return;
          
          const y = horizonY + (h - horizonY) * relativePos;
          const scale = 0.3 + relativePos * 1.5;
          const markerSize = 80 * scale;
          
          // Draw marker pillar
          ctx.fillStyle = section.color;
          ctx.fillRect(
            w / 2 - markerSize / 2,
            y - markerSize * 2,
            markerSize,
            markerSize * 2
          );
          
          // Draw marker top
          ctx.fillStyle = section.color;
          ctx.fillRect(
            w / 2 - markerSize * 0.6,
            y - markerSize * 2.2,
            markerSize * 1.2,
            markerSize * 0.3
          );
          
          // Draw section number
          ctx.fillStyle = "white";
          ctx.font = `bold ${markerSize * 0.5}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            (index + 1).toString(),
            w / 2,
            y - markerSize * 2.5
          );
          
          // Outline
          ctx.strokeStyle = "black";
          ctx.lineWidth = 3;
          ctx.strokeText(
            (index + 1).toString(),
            w / 2,
            y - markerSize * 2.5
          );
        }
      });

      // Draw buildings on sides
      for (let i = 0; i < 8; i++) {
        const buildingProgress = (i * 0.12 + 0.1);
        const relativePos = (scroll - buildingProgress + 0.15) / 0.3;
        
        if (relativePos >= 0 && relativePos <= 1) {
          const y = horizonY + (h - horizonY) * relativePos;
          const scale = 0.3 + relativePos * 1.2;
          const buildingWidth = 60 * scale;
          const buildingHeight = 150 * scale;
          
          // Left building
          ctx.fillStyle = i % 2 === 0 ? "#FF6B6B" : "#4ECDC4";
          ctx.fillRect(
            w * 0.15 - buildingWidth / 2,
            y - buildingHeight,
            buildingWidth,
            buildingHeight
          );
          
          // Right building
          ctx.fillStyle = i % 2 === 0 ? "#95E1D3" : "#FFE66D";
          ctx.fillRect(
            w * 0.85 - buildingWidth / 2,
            y - buildingHeight,
            buildingWidth,
            buildingHeight
          );
        }
      }

      // Pixelation effect (simple)
      const pixelSize = 4;
      const imageData = ctx.getImageData(0, 0, w, h);
      for (let y = 0; y < h; y += pixelSize) {
        for (let x = 0; x < w; x += pixelSize) {
          const i = (y * w + x) * 4;
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollYProgress]);

  return (
    <div className="w-full h-screen relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Comic-style overlay elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="w-full h-full opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)',
            backgroundSize: '4px 4px'
          }}
        />
      </div>
    </div>
  );
}
