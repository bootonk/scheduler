//
// Mode Functions
//

// Imports
import { useState } from "react";

// Functions
export default function useVisualMode(initial) {
  // mode and history
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition: adding mode to history, updating current mode to new mode
  const transition = function (newMode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      const addHistory = [...history, newMode];
      setHistory(addHistory);
    }

    setMode(newMode);
  };

  // back: removing mode from history, updating current mode to past mode
  const back = function () {
    if (mode !== initial) {
      setMode(history[history.length - 2]);
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  return { mode, transition, back };
}
