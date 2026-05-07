'use client';

import { useEffect } from 'react';

export default function DisableDevTools() {
  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e) => e.preventDefault();

    // 2. Disable Common Shortcuts
    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I/J/C
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Anti-Debugger (Aggressive)
    const antiDebug = () => {
      const start = new Date();
      debugger;
      const end = new Date();
      if (end - start > 100) {
        // DevTools is likely open
        window.location.href = "about:blank"; // Redirect if they bypass and open it
      }
      setTimeout(antiDebug, 100);
    };

    // 4. Console Clearing
    const clearConsole = () => {
      console.clear();
      console.log("%cSTOP!", "color: red; font-size: 50px; font-weight: bold;");
      console.log("%cThis is a premium area. Developer tools are disabled.", "font-size: 20px;");
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    
    // Start protection
    const interval = setInterval(clearConsole, 1000);
    antiDebug(); 

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  return null;
}
