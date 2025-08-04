'use client'

import { useState, useEffect } from 'react'

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get current count from localStorage or start at a fun 90s number
    let currentCount = parseInt(localStorage.getItem('visitorCount') || '12847');
    
    // Increment the count
    currentCount += 1;
    
    // Store the new count
    localStorage.setItem('visitorCount', currentCount.toString());
    
    // Animate the counter
    let start = currentCount - 1;
    const end = currentCount;
    const duration = 2000; // 2 seconds
    const increment = (end - start) / (duration / 50);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        setIsLoading(false);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-block">
      <div className="table-90s">
        <div className="bg-gradient-90s p-1">
          <div className="bg-black p-4 text-center">
            <div className="text-neon-green font-pixel text-sm mb-2 animate-blink">
              ★★★ VISITOR COUNTER ★★★
            </div>
            <div className="bg-black border-2 border-neon-green p-3 inline-block">
              <div className="text-neon-green font-pixel text-3xl glow-text font-mono tracking-wider">
                {isLoading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  count.toLocaleString().padStart(8, '0')
                )}
              </div>
            </div>
            <div className="text-neon-yellow font-pixel text-xs mt-2 animate-pulse">
              You are visitor #{count.toLocaleString()}!
            </div>
            <div className="text-neon-cyan font-pixel text-xs mt-1">
              Since 1997! Totally RAD!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}