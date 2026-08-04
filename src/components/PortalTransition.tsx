import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

interface PortalTransitionContextValue {
  transition: (onComplete?: () => void) => void;
}

const PortalTransitionContext = createContext<PortalTransitionContextValue | null>(null);

export function usePortalTransition(): PortalTransitionContextValue {
  const value = useContext(PortalTransitionContext);
  if (!value) throw new Error('usePortalTransition must be used inside PortalTransitionProvider');
  return value;
}

export function PortalTransitionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false);
  const transition = useCallback((onComplete?: () => void) => {
    setActive(true);
    window.setTimeout(() => onComplete?.(), 250);
    window.setTimeout(() => setActive(false), 850);
  }, []);
  const value = useMemo(() => ({ transition }), [transition]);

  return (
    <PortalTransitionContext.Provider value={value}>
      {children}
      <div aria-hidden="true" className={`portal-transition ${active ? 'portal-transition--active' : ''}`} />
    </PortalTransitionContext.Provider>
  );
}
