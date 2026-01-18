"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface GameDialogueProps {
  scrollYProgress: MotionValue<number>;
}

export default function GameDialogue({ scrollYProgress }: GameDialogueProps) {
  const [currentText, setCurrentText] = useState("");
  const [displayedText, setDisplayedText] = useState("");

  // Section dialogues
  const dialogues = [
    { range: [0, 0.15], text: "WELCOME, TRAVELER... YOUR JOURNEY BEGINS..." },
    { range: [0.15, 0.30], text: "CHAPTER 1: BIO - DISCOVERING THE ORIGINS..." },
    { range: [0.30, 0.45], text: "CHAPTER 2: LOGS - TRACKING THE MILESTONES..." },
    { range: [0.45, 0.60], text: "CHAPTER 3: TECH - ENTERING THE DEV_VERSE..." },
    { range: [0.60, 0.75], text: "CHAPTER 4: FOCUS - FINDING STABILITY..." },
    { range: [0.75, 0.90], text: "CHAPTER 5: SKILLS - LEVELING UP..." },
    { range: [0.90, 1.0], text: "CHAPTER 6: COMM - SEIZING OPPORTUNITY..." },
  ];

  // Determine current dialogue based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const dialogue = dialogues.find(
        (d) => latest >= d.range[0] && latest < d.range[1]
      );
      if (dialogue && dialogue.text !== currentText) {
        setCurrentText(dialogue.text);
        setDisplayedText(""); // Reset for typewriter
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, currentText]);

  // Typewriter effect
  useEffect(() => {
    if (displayedText.length < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentText, displayedText]);

  // Show/hide based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const barHeight = useTransform(scrollYProgress, [0, 0.05], ["0vh", "12vh"]);

  return (
    <motion.div
      style={{ opacity }}
      className="fixed inset-0 z-[200] pointer-events-none font-['Press_Start_2P']"
    >
      {/* TOP BAR */}
      <motion.div
        style={{ height: barHeight }}
        className="absolute top-0 left-0 w-full bg-black/95 border-b-4 border-white/20 flex items-center justify-between px-10"
      >
        <div className="text-white text-[8px] md:text-[10px] tracking-wider">
          PORTFOLIO.EXE
        </div>
        <div className="text-cyan-400 text-[8px] md:text-[10px]">
          SCROLL TO CONTINUE
        </div>
      </motion.div>

      {/* BOTTOM BAR (Dialogue Box) */}
      <motion.div
        style={{ height: barHeight }}
        className="absolute bottom-0 left-0 w-full bg-black/95 border-t-4 border-white/20 flex flex-col items-center justify-center px-10"
      >
        {/* Dialogue Text with typewriter */}
        <motion.p className="text-white text-[10px] md:text-xs text-center max-w-3xl leading-loose tracking-wide">
          {displayedText}
          <span className="animate-pulse">_</span>
        </motion.p>

        {/* Progress indicator */}
        <div className="mt-4 w-64 h-2 bg-zinc-800 relative border-2 border-white/30">
          <motion.div
            style={{
              width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            }}
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
