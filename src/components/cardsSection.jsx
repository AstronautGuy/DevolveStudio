'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button'; // Make sure this path is correct

const cards = [
    '/Creative-Website-Background-Template.jpg',
    '/images/card2.jpg',
    '/images/card3.jpg',
    '/images/card4.jpg',
    '/images/card5.jpg',
    '/images/card6.jpg',
];

const buttonLabels = [
    'Online Store',
    'Local Business',
    'Portfolio',
    'Restaurant',
    'Personal',
    'Services',
];

const descriptions = [
    'Feel the calm of untouched peaks, where the air is pure and dreams soar high.',
    'The city never sleeps—neon glow, endless energy, a pulse that keeps you alive.',
    'Breathe in the salty ocean air; waves crash, carrying stories of the deep.',
    'Among towering trees, secrets rustle in the leaves, a dance of life and time.',
    'Golden sands stretch far and wide, a landscape of silent power and mystery.',
    'Under a canvas of stars, night unfolds its timeless, mesmerizing tale.',
];

export default function Horizontal3DStackWithNav() {
    const [index, setIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const intervalRef = useRef(null);

    const activeIndex = hoveredIndex !== null ? hoveredIndex : index;

    const prevIndex = (activeIndex - 1 + cards.length) % cards.length;
    const nextIndex = (activeIndex + 1) % cards.length;

    const cardData = [
        { id: prevIndex, pos: 'left' },
        { id: activeIndex, pos: 'center' },
        { id: nextIndex, pos: 'right' },
    ];

    const variants = {
        left: {
            x: -150,
            scale: 0.75,
            rotateY: 25,
            opacity: 0.7,
            zIndex: 5,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
        },
        center: {
            x: 0,
            scale: 1,
            rotateY: 0,
            opacity: 1,
            zIndex: 20,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
        },
        right: {
            x: 150,
            scale: 0.75,
            rotateY: -25,
            opacity: 0.7,
            zIndex: 10,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
        },
    };

    useEffect(() => {
        if (hoveredIndex === null) {
            intervalRef.current = setInterval(() => {
                setIndex((prev) => (prev + 1) % cards.length);
            }, 5000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [hoveredIndex]);

    const handleCardClick = (id) => {
        setIndex(id);
        setHoveredIndex(null);
    };

    return (
        <div className="min-h-[70vh] w-full flex flex-col xl:flex-row items-center justify-center bg-white px-4 sm:px-8 xl:px-12 py-12 gap-8">
            <div className="w-full sm:w-1/2 flex flex-col gap-4">
                {buttonLabels.map((label, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <button
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => {
                                setIndex(i);
                                setHoveredIndex(null);
                            }}
                            className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition text-left text-xl sm:text-3xl font-light flex items-center gap-2"
                        >
                            <span className="animate-border inline-block">{label}</span>
                            <ArrowRight className="w-4 h-4 text-inherit" />
                        </button>
                        <p className="ml-4 sm:ml-6 text-gray-400 font-light -mt-2 sm:-mt-3 text-sm sm:text-base">{descriptions[i]}</p>
                    </div>
                ))}
            </div>


            <div className="w-full xl:w-1/2 flex justify-center">
                <div
                    className="relative w-full max-w-md sm:max-w-lg h-[300px] sm:h-[350px]"
                    style={{ perspective: 1000 }} // Tailwind doesn't support perspective by default, so inline here
                >
                    <AnimatePresence initial={false} mode="popLayout">
                        {cardData.map(({ id, pos }) => (
                            <motion.div
                                key={id}
                                className="absolute w-full h-full rounded-xl shadow-2xl cursor-pointer overflow-hidden"
                                variants={variants}
                                initial="center"
                                animate={pos}
                                exit={{ opacity: 0, scale: 0.5 }}
                                style={{ zIndex: variants[pos].zIndex }}
                                onClick={() => handleCardClick(id)}
                            >
                                <img
                                    src={cards[id]}
                                    alt={`Card ${id + 1}`}
                                    className="w-full h-full object-cover select-none"
                                    draggable={false}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}