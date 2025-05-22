'use client';

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePromptPage() {
    const [step, setStep] = useState(1);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const promptRef = useRef(null);

    useEffect(() => {
        const answeredBefore = localStorage.getItem('hasAnswered');
        if (answeredBefore === 'true') {
            setHasAnswered(false);
        }
    }, []);

    useEffect(() => {
        if (!hasAnswered && promptRef.current) {
            promptRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [hasAnswered]);

    const handleNext = () => {
        if (step < 3) {
            setStep((prev) => prev + 1);
        } else {
            localStorage.setItem('hasAnswered', 'true');
            setHasAnswered(true);
        }
    };

    const handleSkip = () => {
        localStorage.setItem('hasAnswered', 'true');
        setHasAnswered(true);
    };

    const questions = [
        {
            question: 'What type of website?',
            options: ['Business', 'Personal', 'Portfolio'],
        },
        {
            question: 'Preferred theme?',
            options: ['Dark', 'Light', 'Minimal'],
        },
        {
            question: 'How complex should it be?',
            options: ['Simple', 'Medium', 'Advanced'],
        },
    ];

    const StepCard = ({ stepIndex }) => {
        const { question, options } = questions[stepIndex];
        const selected = selectedAnswers[stepIndex] || '';

        return (
            <motion.div
                key={stepIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
            >
                <Card className="w-full max-w-xl mx-auto">
                    <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Question {stepIndex + 1} of {questions.length}
              </span>
                            <Button variant="ghost" size="sm" onClick={handleSkip}>
                                Skip
                            </Button>
                        </div>
                        <h2 className="text-xl font-semibold">{question}</h2>
                        <RadioGroup
                            value={selected}
                            onValueChange={(val) =>
                                setSelectedAnswers((prev) => ({
                                    ...prev,
                                    [stepIndex]: val,
                                }))
                            }
                            className="space-y-2"
                        >
                            {options.map((option) => (
                                <div className="flex items-center space-x-2" key={option}>
                                    <RadioGroupItem value={option} id={option} />
                                    <Label htmlFor={option}>{option}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                        <Button className="mt-4" disabled={!selected} onClick={handleNext}>
                            {stepIndex < questions.length - 1 ? 'Next' : 'Finish'}
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        );
    };

    return (
        <div className="p-6">

            {!hasAnswered && (
                <div ref={promptRef} className="mb-6">
                    <AnimatePresence mode="wait">
                        <StepCard key={step} stepIndex={step - 1} />
                    </AnimatePresence>
                </div>
            )}

            {hasAnswered && (
                <motion.main
                    key="main-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h2 className="text-2xl font-semibold">Welcome aboard, Astronaut 🧑‍🚀</h2>
                    <p className="mt-4">Your dashboard is live. The void is yours to shape.</p>
                    {/* Replace this with your actual content */}
                </motion.main>
            )}
        </div>
    );
}