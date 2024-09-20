'use client'
import React, { useState } from 'react'
import {
    Box,
    TextField,
    Button,
    Typography,
    ThemeProvider,
    createTheme,
    CssBaseline,
    CircularProgress,
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
    },
});

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
    
        try {
            const response = await fetch('https://cicada-backend.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, pass: password.toLowerCase() }),
            })
    
            const data = await response.json()
    
            if (response.ok) {
                console.log('Login successful:', data)
                // Store the username in localStorage
                localStorage.setItem('username', username)
                router.push('/oracle')
            } else {
                setError(data.error || 'Login failed')
            }
        } catch (error) {
            console.error('Login error:', error)
            setError('An error occurred during login')
        } finally {
            setIsLoading(false)
        }
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
                }}
            >
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
                        maxWidth: '400px',
                        width: '100%',
                        boxShadow: '0 0 20px rgba(51, 255, 0, 0.5)',
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
                        ENTER THE VOID
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        required
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{
                            input: { color: 'primary.main' },
                            label: { color: 'primary.main' }
                        }}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'DECRYPT'}
                    </Button>
                    {error && (
                        <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Typography variant="body2" sx={{ color: 'primary.main', textAlign: 'center', mt: 2 }}>
  &ldquo;The key to immortality is first living a life worth remembering.&rdquo; - Bruce Lee
</Typography>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default LoginPage