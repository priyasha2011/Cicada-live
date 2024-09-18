import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

import { useRouter } from 'next/navigation'

const OracleLogoutPage = () => {
  const [answer, setAnswer] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase() === 'cesare lombroso') {
      setAlertMessage('Correct! Redirecting to the next page...');
      setShowAlert(true);
      setTimeout(() => {
        router.push('/final'); // Replace '/next-page' with your actual next page route
      }, 2000);
    } else {
      setAlertMessage('Incorrect answer. Please try again.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-500 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-mono mb-4">$Oracle. Ai_LogoutPage_OracleofThoughts/Please Enter :</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border-2 border-green-500 rounded-md overflow-hidden">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter answer"
              className="flex-grow bg-black text-green-500 p-2 outline-none placeholder-green-700"
            />
            <button
              type="submit"
              className="bg-green-500 text-black px-4 py-2 font-bold hover:bg-green-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>

        {showAlert && (
          <div className={`mt-4 p-3 ${alertMessage.includes('Correct') ? 'bg-green-500' : 'bg-red-500'} text-black rounded-md flex items-center`}>
            <AlertCircle className="mr-2" />
            <span>{alertMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OracleLogoutPage;