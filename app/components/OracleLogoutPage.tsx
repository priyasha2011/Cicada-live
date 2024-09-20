import React, { useState, useEffect } from 'react';
import { AlertCircle, Terminal, Lock, Cpu, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

const OracleLogoutPage = () => {
  const [answer, setAnswer] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [typing, setTyping] = useState('');
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const fullText = "$Oracle. Ai_LogoutPage_OracleofThoughts/Please Enter :";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTyping(fullText.slice(0, typing.length + 1));
    }, 100);
    return () => clearTimeout(timeout);
  }, [typing]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase() === 'cesare lombroso') {
      setAlertMessage('Correct! Decrypting secure channel...');
      setShowAlert(true);
      setTimeout(() => {
        router.push('/cicadendlast');
      }, 3000);
    } else {
      setAlertMessage('Incorrect. Access denied. Retry authentication.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-500 p-4 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzAwMCIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIiBmaWxsPSIjMDBmZjAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
      <div className="w-full max-w-3xl relative z-10 bg-black bg-opacity-50 p-8 rounded-lg shadow-2xl border-4 border-green-500 border-opacity-50 backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-full h-full bg-green-500 opacity-5 animate-pulse rounded-lg"></div>
        <Terminal className="w-24 h-24 mb-8 mx-auto animate-float text-green-400" />
        <h1 className={`text-3xl font-mono mb-8 text-center overflow-hidden whitespace-normal break-words ${glitchEffect ? 'animate-glitch' : ''}`}>
          {typing}
          <span className="animate-blink">_</span>
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border-2 border-green-500 rounded-md overflow-hidden shadow-lg shadow-green-500/20 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter access code"
              className="flex-grow bg-black text-green-500 p-4 outline-none placeholder-green-700 font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="bg-black text-green-500 px-3 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <button
              type="submit"
              className="bg-green-500 text-black px-6 py-4 font-bold hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <Lock className="w-6 h-6" />
            </button>
            <Cpu className="absolute right-20 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-700 animate-pulse" />
          </div>
        </form>

        {showAlert && (
          <div className={`mt-6 p-4 ${alertMessage.includes('Correct') ? 'bg-green-500' : 'bg-red-500'} text-black rounded-md flex items-center justify-center animate-fade-in relative overflow-hidden`}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzAwMCIvPgo8cGF0aCBkPSJNMCAwTDYwIDYwTTYwIDBMMCA2MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-10"></div>
            <AlertCircle className="mr-3 animate-pulse" />
            <span className="font-mono relative z-10">{alertMessage}</span>
          </div>
        )}
      </div>
      <div className="fixed bottom-4 left-4 text-green-700 font-mono text-sm animate-fade-in-out">
        System Status: Active
      </div>
      <div className="fixed top-4 right-4 text-green-700 font-mono text-sm animate-fade-in-out">
        Connection: Encrypted
      </div>
      <div className="fixed bottom-4 right-4 text-green-700 font-mono text-xs animate-pulse">
        v2.1.24
      </div>
    </div>
  );
};

export default OracleLogoutPage;