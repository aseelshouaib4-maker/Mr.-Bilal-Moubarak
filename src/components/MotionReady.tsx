"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const MotionReadyContext = createContext(false);

/**
 * Resolves true once web fonts have loaded (or after a short timeout), so
 * SplitText measures the real line breaks instead of fallback fonts.
 */
export function MotionReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setReady(true);
    };
    const timeout = window.setTimeout(finish, 1800);
    if ("fonts" in document) {
      document.fonts.ready.then(finish).catch(finish);
    } else {
      finish();
    }
    return () => window.clearTimeout(timeout);
  }, []);

  return <MotionReadyContext.Provider value={ready}>{children}</MotionReadyContext.Provider>;
}

export function useMotionReady() {
  return useContext(MotionReadyContext);
}
