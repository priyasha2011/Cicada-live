'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const TerminalChallenge: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const router = useRouter();
    const terminalRef = useRef<HTMLDivElement>(null);

    const steps = [
        { question: 'Do you have the pass code? (yes/no)', correctAnswer: 'no' },
        { question: 'Install required package receiver', correctAnswer: 'pip install receiver' },
    ];

    useEffect(() => {
        setOutput([`CMD | PY`, steps[currentStep].question]);
    }, [currentStep]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [output]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        } else if (e.key === 'Backspace') {
            setInput(prev => prev.slice(0, -1));
        } else if (e.key.length === 1) {
            setInput(prev => prev + e.key);
        }
    };

    const handleSubmit = () => {
        const currentQuestion = steps[currentStep];
        const newOutput = [...output, `> ${input}`];

        if (input.toLowerCase() === currentQuestion.correctAnswer) {
            if (currentStep === steps.length - 1) {
                newOutput.push('Congratulations! You have completed the challenge.');
                router.push('/frequency');
            } else {
                newOutput.push('Correct!');
                setCurrentStep(currentStep + 1);
                newOutput.push(steps[currentStep + 1].question);
            }
            setAttempts(0);
        } else {
            newOutput.push('Incorrect. Please try again.');
            setAttempts(attempts + 1);

            if (attempts >= 3) {  // This is the 4th attempt (0, 1, 2, 3)
                newOutput.push('Too many incorrect attempts. Redirecting to login page...');
                setTimeout(() => router.push('/worldofcrypts'), 2000);  // Redirect after 2 seconds
            }
        }

        setOutput(newOutput);
        setInput('');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#000',
                color: '#33ff00',
                fontFamily: 'Courier New, monospace',
                padding: 3,
            }}
        >
            <Box
                ref={terminalRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                sx={{
                    width: '80%',
                    maxWidth: 600,
                    height: '70vh',
                    border: '2px solid #33ff00',
                    borderRadius: 2,
                    padding: 2,
                    overflowY: 'auto',
                    cursor: 'text',
                    '&:focus': {
                        outline: 'none',
                    },
                }}
            >
                {output.map((line, index) => (
                    <Typography key={index} variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {line}
                    </Typography>
                ))}
                <Typography variant="body1" component="span">
                    {`> ${input}`}
                    <span style={{ animation: 'blink 1s step-end infinite' }}>▋</span>
                </Typography>
            </Box>
            <Typography variant="body2" sx={{ marginTop: 2, color: '#666' }}>
                Click on the terminal and start typing. Press Enter to submit.
            </Typography>
        </Box>
    );
};

export default TerminalChallenge;