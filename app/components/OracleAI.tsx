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
    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
          event.preventDefault();
        };
    
        const handleCopy = (event: ClipboardEvent) => {
          event.preventDefault();
        };
    
        const handlePaste = (event: ClipboardEvent) => {
          event.preventDefault();
        };
    
        const handleKeyDown = (event: KeyboardEvent) => {
          if (
            event.ctrlKey &&
            (event.key === "c" || event.key === "v" || event.key === "x")
          ) {
            event.preventDefault();
          }
          if (event.ctrlKey && event.shiftKey && event.key === "I") {
            event.preventDefault();
          }
        };
    
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("copy", handleCopy);
        document.addEventListener("paste", handlePaste);
        document.addEventListener("keydown", handleKeyDown);
    
        return () => {
          document.removeEventListener("contextmenu", handleContextMenu);
          document.removeEventListener("copy", handleCopy);
          document.removeEventListener("paste", handlePaste);
          document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const [teamNumber, setTeamNumber] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const [dialogMessage, setDialogMessage] = useState('')
    const [counter, setCounter] = useState(0)
    const [showWarning, setShowWarning] = useState(false)
    const [output, setOutput] = useState<string[]>([])
    const [isStarted, setIsStarted] = useState(false)
    
    const [showFinalImage, setShowFinalImage] = useState(false)
    const [countdown, setCountdown] = useState(10)
    const router = useRouter()
    const [, setUsername] = useState('')

    useEffect(() => {
        const initializeApp = async () => {
            console.log('Initializing app...')
            const storedUsername = localStorage.getItem('username')
            if (storedUsername) {
                setUsername(storedUsername)
            }

            const storedCounter = localStorage.getItem('counter')
            if (storedCounter) {
                setCounter(parseInt(storedCounter, 10))
            }

            const storedIsStarted = localStorage.getItem('isStarted')
            if (storedIsStarted) {
                setIsStarted(storedIsStarted === 'true')
            }

            const storedOutput = localStorage.getItem('output')
            if (storedOutput) {
                setOutput(JSON.parse(storedOutput))
            }

            
        }

        initializeApp()
    }, [router])

    useEffect(() => {
        if (counter === 5) {
            setShowWarning(true)
            setTimeout(() => {
                setShowWarning(false)
            }, 3000)
        } else if (counter === 7) {
            setShowFinalImage(true)
            const timer = setInterval(() => {
                setCountdown((prevCount) => {
                    if (prevCount <= 1) {
                        clearInterval(timer)
                        setTimeout(() => {
                            router.push('/worldofcrypts')
                        }, 1000) 
                        return 0
                
                    }
                    return prevCount - 1
                })
            }, 1000)

            return () => clearInterval(timer)
        }

        localStorage.setItem('counter', counter.toString())
        localStorage.setItem('isStarted', isStarted.toString())
        localStorage.setItem('output', JSON.stringify(output))
        
    }, [counter, isStarted,  output])

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (counter < 7) {
            const newCounter = counter + 1
            setCounter(newCounter)
            setIsStarted(true)

            try {
                const numbers = generateSets()
                const newOutput = numbers.map(set => set.map(num => num.toString().padStart(2, '0')).join(' '))
                setOutput(newOutput)
                
            } catch (error) {
                console.error('Error in handleGenerate:', error)
                setDialogMessage("An error occurred. Please try again.")
                setOpenDialog(true)
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (teamNumber === '10') {
            
            
            router.push('/terminal-challenge')
        } else {
            setDialogMessage("Incorrect answer. Please try again.")
            setOpenDialog(true)
            router.push('/worldofcrypts')
        }
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const generateSet = () => {
        const numbers = new Set<number>()
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
                        boxShadow: '0 2px 10px rgba(0, 255, 0, 0.2)',
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
                        3310
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
                    >
                        Submit Answer
                    </Button>
                    <Button
                        onClick={handleGenerate}
                        fullWidth
                        variant="outlined"
                        sx={{ mb: 2 }}
                        disabled={counter >= 7}
                    >
                        {!isStarted ? 'Start' : 'Generate Again'}
                    </Button>
                    <Box sx={{ textAlign: 'left', whiteSpace: 'pre', marginTop: 2 }}>
                        {output.map((line, index) => (
                            <Typography key={index} variant="body2" sx={{ color: 'primary.main' }}>{line}</Typography>
                        ))}
                    </Box>
                    <Typography variant="body1" sx={{ marginBottom: 2, whiteSpace: 'nowrap' }}>
  Cause he said once, &ldquo;Genius is one of the many forms of insanity&rdquo; <span style={{ display: 'inline-block', width: '15px', height: '20px', backgroundColor: '#33ff00', animation: 'blink 1s step-start infinite', verticalAlign: 'bottom' }}></span>
</Typography>
                </Box>

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
                    </Box>
                )}

                {showFinalImage && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            zIndex: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <img 
                            src="./images/Technogreen.jpeg" 
                            alt="Cryptic Hunt Theme" 
                            style={{ maxWidth: '80%', maxHeight: '60%', objectFit: 'contain' }} 
                        />
                        <Typography variant="h4" sx={{ color: 'primary.main', marginTop: 2 }}>
                            Sponsored by Techknowgreen Solutions Limited
                        </Typography>
                        <Typography variant="h2" sx={{ color: 'primary.main', marginTop: 2 }}>
                            {countdown}
                        </Typography>
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