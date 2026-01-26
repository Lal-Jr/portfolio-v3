"use client";
import React from "react";

const ComicBubble = ({ text, className = "" }: { text: string; className?: string }) => {
    return (
        <div className={`absolute -top-36 left-1/2 -translate-x-1/2 w-64 pointer-events-none z-50 transform scale-75 group-hover:scale-100 origin-bottom transition-all duration-500 opacity-0 group-hover:opacity-100 ${className}`}>
            <div className="relative min-h-[140px] flex items-center justify-center p-6 px-10 pb-10">
                {/* Shadow path (offset) */}
                <svg
                    viewBox="0 0 200 140"
                    className="absolute inset-0 w-full h-full translate-x-1.5 translate-y-1.5"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M15,25 C15,15 25,10 55,10 L145,10 C175,10 185,15 185,35 L190,85 C190,105 175,115 145,115 L115,115 L100,135 L85,115 L45,115 C15,115 10,105 10,75 Z"
                        fill="black"
                    />
                </svg>

                {/* Main bubble path */}
                <svg
                    viewBox="0 0 200 140"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M15,25 C15,15 25,10 55,10 L145,10 C175,10 185,15 185,35 L190,85 C190,105 175,115 145,115 L115,115 L100,135 L85,115 L45,115 C15,115 10,105 10,75 Z"
                        fill="white"
                        stroke="black"
                        strokeWidth="4"
                        strokeLinejoin="round"
                    />
                </svg>

                {/* Text Content */}
                <p className="relative z-10 font-handwriting font-bold text-lg md:text-xl leading-tight text-black text-center">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default ComicBubble;
