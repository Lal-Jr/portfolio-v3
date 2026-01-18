"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface GameDialogueProps {
  scrollYProgress: MotionValue<number>;
}

export default function GameDialogue({ scrollYProgress }: GameDialogueProps) {
  const [currentText, setCurrentText] = useState("");
  const [displayedText, setDisplayedText] = useState("");

  // Section dialogues - equal 15% spacing
  const dialogues = [
    { range: [0, 0.10], text: "WELCOME, TRAVELER... INITIALIZING..." },
    { range: [0.10, 0.20], text: "EXPLORE THE GRID... CHOOSE YOUR PATH..." },
    { range: [0.20, 0.25], text: "LOADING CHAPTER..." },
    { range: [0.25, 0.40], text: "CHAPTER 1: ABOUT - MEET THE HERO..." },
    { range: [0.40, 0.55], text: "CHAPTER 2: EXPERIENCE - THE JOURNEY SO FAR..." },
    { range: [0.55, 0.70], text: "CHAPTER 3: ARSENAL - TOOLS OF THE TRADE..." },
    { range: [0.70, 0.85], text: "CHAPTER 4: PROJECTS - BATTLE ACHIEVEMENTS..." },
    { range: [0.85, 1.0], text: "CHAPTER 5: ASPIRATIONS - FUTURE QUESTS..." },
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

  // Show/hide based on scroll - keep visible until end
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
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
