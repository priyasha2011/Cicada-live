'use client'
import React, { useState, useEffect } from 'react'
import {
    Box,
    TextField,
    Button,
    Typography,
    ThemeProvider,
    createTheme,
    CssBaseline,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material'
import { useRouter } from 'next/navigation'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#33ff00',
        },
        background: {
            default: '#000000',
            paper: '#001a00',
        },
    },
    typography: {
        fontFamily: 'Courier New, Courier, monospace',
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#33ff00',
                        },
                        '&:hover fieldset': {
                            borderColor: '#33ff00',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#33ff00',
                        },
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderColor: '#33ff00',
                    '&:hover': {
                        borderColor: '#33ff00',
                        backgroundColor: 'rgba(51, 255, 0, 0.1)',
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#001a00',
                    border: '2px solid #33ff00',
                },
            },
        },
    },
});

const OracleAI = () => {
    const [teamNumber, setTeamNumber] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const [dialogMessage, setDialogMessage] = useState('')
    const [counter, setCounter] = useState(0)
    const [showWarning, setShowWarning] = useState(false)
    const [output, setOutput] = useState<string[]>([])
    const [isStarted, setIsStarted] = useState(false)
    const [showUltimateBox, setShowUltimateBox] = useState(false)
    const [finalAnswer, setFinalAnswer] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (counter === 5) {
            setShowWarning(true)
            setTimeout(() => {
                setShowWarning(false)
            }, 3000)
        } else if (counter === 7) {
            setShowUltimateBox(true)
        }
    }, [counter])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (counter < 7) {
            const newCounter = counter + 1
            setCounter(newCounter)
            setIsStarted(true)

            try {
                const numbers = generateSets()
                setOutput(numbers.map(set => set.map(num => num.toString().padStart(2, '0')).join(' ')))
            } catch (error) {
                console.error('Error in handleSubmit:', error)
                setDialogMessage("An error occurred. Please try again.")
                setOpenDialog(true)
            }
        }
    }

    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (finalAnswer === '10') {
            setDialogMessage("Congratulations! You've solved the puzzle.")
        } else {
            setDialogMessage("Incorrect answer. Access denied.")
        }
        setOpenDialog(true)
        setTimeout(() => {
            router.push('/login')
        }, 3000)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const generateSet = () => {
        let numbers = new Set<number>()
        while (numbers.size < 5) {
            numbers.add(Math.floor(Math.random() * 200) + 1)
        }
        return Array.from(numbers)
    }

    const generateSets = () => {
        const sets = Array.from({ length: 5 }, generateSet)
        const setsWithTenIndices: number[] = []

        while (setsWithTenIndices.length < 2) {
            const index = Math.floor(Math.random() * 5)
            if (!setsWithTenIndices.includes(index)) {
                setsWithTenIndices.push(index)
            }
        }

        setsWithTenIndices.forEach((index: number) => {
            const set = sets[index]
            const pos = Math.floor(Math.random() * 5)
            set[pos] = 10
        })

        return sets
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                    padding: 3,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        backgroundColor: 'background.paper',
                        color: 'primary.main',
                        padding: '10px 20px',
                        boxShadow: '0 2px 10px rgba(51, 255, 0, 0.2)',
                        position: 'fixed',
                        top: 0,
                        zIndex: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            animation: 'scrollLeft 10s linear infinite',
                            '@keyframes scrollLeft': {
                                '0%': { transform: 'translateX(100%)' },
                                '100%': { transform: 'translateX(-100%)' },
                            },
                        }}
                    >
                        <Typography variant="h4" sx={{ marginRight: '50px' }}>Oracle.AI</Typography>
                        <Typography variant="body2">Max generation & trial counter : 7 | 2</Typography>
                    </Box>
                </Box>

                <Typography variant="h5" sx={{ marginBottom: 2, animation: 'flicker 1.5s infinite' }}>
                    Generations: {counter}
                </Typography>

                {!showUltimateBox ? (
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 4,
                            borderRadius: 2,
                            border: '2px solid #33ff00',
                            backgroundColor: 'background.paper',
                            maxWidth: '800px',
                            width: '80%',
                            boxShadow: '0 0 20px rgba(51, 255, 0, 0.5)',
                        }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
                            3301
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 2, whiteSpace: 'nowrap' }}>
                            [sudo] $ enter the launch code for $/OracleAI_Hello_Player: <span style={{ display: 'inline-block', width: '15px', height: '20px', backgroundColor: '#33ff00', animation: 'blink 1s step-start infinite', verticalAlign: 'bottom' }}></span>
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            id="teamNumber"
                            name="teamNumber"
                            autoFocus
                            value={teamNumber}
                            onChange={(e) => setTeamNumber(e.target.value)}
                            sx={{
                                input: { color: 'primary.main' },
                                label: { color: 'primary.main' }
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={counter >= 7}
                        >
                            {!isStarted ? 'Start' : 'Generate Again'}
                        </Button>
                        <Box sx={{ textAlign: 'left', whiteSpace: 'pre', marginTop: 2 }}>
                            {output.map((line, index) => (
                                <Typography key={index} variant="body2" sx={{ color: 'primary.main' }}>{line}</Typography>
                            ))}
                        </Box>
                    </Box>
                ) : (
                    <Box
                        component="form"
                        onSubmit={handleFinalSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 4,
                            borderRadius: 2,
                            border: '2px solid #33ff00',
                            backgroundColor: 'background.paper',
                            maxWidth: '800px',
                            width: '80%',
                            boxShadow: '0 0 20px rgba(51, 255, 0, 0.5)',
                        }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
                            FINAL CHALLENGE
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 2, whiteSpace: 'nowrap' }}>
                            Enter the final answer:
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            id="finalAnswer"
                            name="finalAnswer"
                            autoFocus
                            value={finalAnswer}
                            onChange={(e) => setFinalAnswer(e.target.value)}
                            sx={{
                                input: { color: 'primary.main' },
                                label: { color: 'primary.main' }
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit Final Answer
                        </Button>
                    </Box>
                )}

                {showWarning && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            zIndex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant="h2" sx={{ color: 'white', marginBottom: 2 }}>
                            ⚠️ SYSTEM ALERT ⚠️
                        </Typography>
                        {/* <Typography variant="h3" sx={{ color: 'white' }}>
                            2 generations left
                        </Typography> */}
                    </Box>
                )}

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Response</DialogTitle>
                    <DialogContent>
                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>{dialogMessage}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    )
}

export default OracleAI