import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type GateStatus = 'showing' | 'entered';

export interface Director {
  progress: number;
}

interface GateContextValue {
  status: GateStatus;
  enter: () => void;
  replay: () => void;
  /** Mutable ref shared between GSAP and R3F — no re-renders */
  directorRef: React.MutableRefObject<Director>;
}

const GateContext = createContext<GateContextValue | null>(null);

export function useGate(): GateContextValue {
  const value = useContext(GateContext);
  if (!value) throw new Error('useGate must be used inside GateProvider');
  return value;
}

const SESSION_KEY = 'gate_entered';

export function GateProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<GateStatus>(() =>
    typeof sessionStorage !== 'undefined' &&
    sessionStorage.getItem(SESSION_KEY) === 'true'
      ? 'entered'
      : 'showing',
  );

  const directorRef = useRef<Director>({ progress: 0 });

  const enter = useMemo(
    () => () => {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setStatus('entered');
    },
    [],
  );

  const replay = useMemo(
    () => () => {
      directorRef.current.progress = 0;
      setStatus('showing');
    },
    [],
  );

  const value = useMemo(
    () => ({ status, enter, replay, directorRef }),
    [status, enter, replay],
  );

  return <GateContext.Provider value={value}>{children}</GateContext.Provider>;
}
