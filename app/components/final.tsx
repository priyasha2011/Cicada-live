'use client'
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const FinalMessage: React.FC = () => {
  const [message, setMessage] = useState('');
  const finalMessage = `Hello Dr. Cesare Lombroso

The research has been done, I have collected my
samples the mind liquidation and data storage will
soon begin, the best samples have been elected and
rest have been eliminated. Oracle will transfer you
the control of Ai command center.

Good night Dr. Lombroso`;

  useEffect(() => {
    let index = 0;
    let currentMessage = '';
    const typeWriter = () => {
      if (index < finalMessage.length) {
        currentMessage += finalMessage.charAt(index);
        setMessage(currentMessage);
        index++;
        setTimeout(typeWriter, 50); // Adjust typing speed as needed
      }
    };
    typeWriter();
  }, []);

  return (
    <>
      <Head>
        <title>Oracle - Final Message</title>
      </Head>
      <div className="min-h-screen bg-black flex items-center justify-center p-4" style={{
        backgroundImage: "./images/stars.jpg",
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}>
        <div className="max-w-3xl w-full bg-black bg-opacity-75 p-6 rounded">
          <p className="text-cyan-400 text-xl whitespace-pre-wrap font-mono leading-relaxed glowing-text">
            {message}
          </p>
        </div>
      </div>
      <style jsx global>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 15px #0ff; }
          50% { text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff; }
        }
        body {
          margin: 0;
          padding: 0;
          background: #000;
          color: #0ff;
          font-family: 'Courier New', Courier, monospace;
          text-align: center;
          overflow: hidden;
        }
        .glowing-text {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default FinalMessage;