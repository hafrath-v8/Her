'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KissPage() {
  const router = useRouter();
  const [intensity, setIntensity] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [mode, setMode] = useState('receive');
  const [sentCount, setSentCount] = useState(0);
  const [receivedCount, setReceivedCount] = useState(0);
  const [lipMarks, setLipMarks] = useState([]);
  const [message, setMessage] = useState('');
  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const [yourName, setYourName] = useState('Hafrath');

  useEffect(() => {
    const savedSent = localStorage.getItem('kissSentCount');
    const savedReceived = localStorage.getItem('kissReceivedCount');
    if (savedSent) setSentCount(parseInt(savedSent));
    if (savedReceived) setReceivedCount(parseInt(savedReceived));
  }, []);

  const startKiss = (e) => {
    e.preventDefault();
    if (isComplete) return;
    
    setIsPressed(true);
    setIntensity(0);
    setLipMarks([]);
    setMessage('');
    
    intervalRef.current = setInterval(() => {
      setIntensity(prev => {
        const newIntensity = prev + 1;
        
        if (newIntensity % 15 === 0) {
          addLipMark();
        }
        
        if (navigator.vibrate) {
          if (newIntensity === 30) {
            navigator.vibrate(30);
          } else if (newIntensity === 50) {
            navigator.vibrate(50);
          } else if (newIntensity === 70) {
            navigator.vibrate([50, 30, 50]);
          } else if (newIntensity === 85) {
            navigator.vibrate([80, 40, 80]);
          } else if (newIntensity === 95) {
            navigator.vibrate([100, 30, 100]);
          }
        }
        
        if (newIntensity >= 100) {
          clearInterval(intervalRef.current);
          completeKiss();
          return 100;
        }
        return newIntensity;
      });
    }, 40);
  };

  const stopKiss = (e) => {
    e.preventDefault();
    setIsPressed(false);
    clearInterval(intervalRef.current);
    
    if (intensity < 100) {
      setIntensity(0);
      setLipMarks([]);
    }
  };

  const completeKiss = () => {
    setIsComplete(true);
    setIsPressed(false);
    
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 300]);
    }
    
    if (mode === 'receive') {
      const newReceived = receivedCount + 1;
      setReceivedCount(newReceived);
      localStorage.setItem('kissReceivedCount', newReceived.toString());
      setMessage('Kissed by the most beautiful soul. I\'m yours. 💋');
    } else {
      const newSent = sentCount + 1;
      setSentCount(newSent);
      localStorage.setItem('kissSentCount', newSent.toString());
      setMessage(`Kiss sent flying to ${yourName}! 😘`);
    }
    
    // Burst lip marks
    for (let i = 0; i < 20; i++) {
      setTimeout(() => addLipMark(), i * 50);
    }
    
    timerRef.current = setTimeout(() => {
      setIsComplete(false);
      setIntensity(0);
      setLipMarks([]);
      setMessage('');
    }, 3500);
  };

  const addLipMark = () => {
    const id = Date.now() + Math.random();
    setLipMarks(prev => [...prev, {
      id,
      left: 20 + Math.random() * 60,
      size: 20 + Math.random() * 30,
      animationDuration: 1 + Math.random() * 1.5,
      rotation: Math.random() * 360,
    }]);
    
    setTimeout(() => {
      setLipMarks(prev => prev.filter(l => l.id !== id));
    }, 2000);
  };

  const getBarColor = () => {
    if (intensity < 30) return '#f8a5c2';
    if (intensity < 60) return '#e84393';
    if (intensity < 85) return '#c0392b';
    return '#6c0033';
  };

  const getScreenOverlay = () => {
    if (intensity < 30) return 'rgba(0,0,0,0)';
    if (intensity < 60) return 'rgba(255,100,150,0.08)';
    if (intensity < 85) return 'rgba(255,50,100,0.15)';
    if (intensity < 100) return 'rgba(255,0,80,0.22)';
    return 'rgba(0,0,0,0)';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #a18cd1 0%, #fbc2eb 50%, #e84393 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 16px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.3s ease',
    }}>
      {/* Screen Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: getScreenOverlay(),
        transition: 'background 0.3s ease',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Floating Lip Marks */}
      {lipMarks.map(lip => (
        <div
          key={lip.id}
          style={{
            position: 'absolute',
            left: `${lip.left}%`,
            bottom: '30%',
            fontSize: `${lip.size}px`,
            animation: `floatUpKiss ${lip.animationDuration}s ease-out forwards`,
            pointerEvents: 'none',
            zIndex: 10,
            transform: `rotate(${lip.rotation}deg)`,
          }}
        >
          💋
        </div>
      ))}

      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '16px',
          background: 'rgba(255,255,255,0.3)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
        }}
      >
        ←
      </button>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
        zIndex: 1,
        gap: '20px',
      }}>
        {/* Mode Toggle */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '30px',
          padding: '4px',
          backdropFilter: 'blur(10px)',
          gap: '4px',
          width: '100%',
        }}>
          <button
            onClick={() => { setMode('receive'); setIntensity(0); setLipMarks([]); }}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '26px',
              border: 'none',
              background: mode === 'receive' ? 'white' : 'transparent',
              color: mode === 'receive' ? '#e84393' : 'rgba(255,255,255,0.8)',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            Receive Kiss 😘
          </button>
          <button
            onClick={() => { setMode('send'); setIntensity(0); setLipMarks([]); }}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '26px',
              border: 'none',
              background: mode === 'send' ? 'white' : 'transparent',
              color: mode === 'send' ? '#e84393' : 'rgba(255,255,255,0.8)',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            Send Kiss 💌
          </button>
        </div>

        {/* Title */}
        <h2 style={{
          color: 'white',
          fontSize: '1.8rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}>
          {mode === 'receive' ? 'Kiss Me?' : `Send a Kiss to ${yourName}`}
        </h2>

        {/* Kiss Button */}
        <button
          onMouseDown={startKiss}
          onMouseUp={stopKiss}
          onMouseLeave={stopKiss}
          onTouchStart={startKiss}
          onTouchEnd={stopKiss}
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            border: '4px solid rgba(255,255,255,0.6)',
            background: isPressed 
              ? `radial-gradient(circle, ${getBarColor()} 0%, #e84393 100%)`
              : 'radial-gradient(circle, #fd79a8 0%, #e84393 100%)',
            fontSize: '5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: isPressed ? 'scale(0.95)' : 'scale(1)',
            boxShadow: isPressed
              ? '0 5px 20px rgba(255,0,100,0.4), inset 0 0 30px rgba(255,255,255,0.3)'
              : '0 10px 30px rgba(255,0,100,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'none',
            position: 'relative',
          }}
        >
          {isComplete ? '💖' : '😘'}
          {!isPressed && !isComplete && (
            <span style={{
              position: 'absolute',
              bottom: '25px',
              fontSize: '0.85rem',
              color: 'white',
              fontWeight: '600',
            }}>
              HOLD ME
            </span>
          )}
        </button>

        {/* Progress Bar */}
        <div style={{ width: '100%', maxWidth: '300px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'white',
            fontSize: '0.85rem',
            marginBottom: '6px',
            fontWeight: '500',
          }}>
            <span>Intensity</span>
            <span>{intensity}%</span>
          </div>
          <div style={{
            width: '100%',
            height: '14px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '7px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${intensity}%`,
              height: '100%',
              background: getBarColor(),
              borderRadius: '7px',
              transition: 'width 0.05s linear, background 0.3s ease',
              boxShadow: '0 0 10px rgba(255,255,255,0.5)',
            }} />
          </div>
        </div>

        {/* Completion Message */}
        {isComplete && (
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '16px',
            padding: '16px 24px',
            textAlign: 'center',
            animation: 'popIn 0.4s ease',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }}>
            <p style={{
              color: '#e84393',
              fontSize: '1.1rem',
              fontWeight: '600',
              margin: 0,
            }}>
              {message}
            </p>
          </div>
        )}

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '20px',
          color: 'rgba(255,255,255,0.9)',
          fontSize: '0.8rem',
        }}>
          <span>😘 Received: {receivedCount}</span>
          <span>💌 Sent: {sentCount}</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatUpKiss {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-300px) scale(0) rotate(180deg); opacity: 0; }
        }
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}