import { useState } from "react";

// do i need the initialHistory as a parameter?
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    if (replace) {
      const replacedHistory = [...history];
      setHistory([...replacedHistory.slice(0, -1), newMode]);
    } else {
      const addHistory = [...history, newMode];
      setHistory(addHistory);
    }
    
    setMode(newMode);
  };

  const back = function() {
    if (mode !== initial) {
      setMode(history[history.length-2]);
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  return { mode, transition, back };
};
