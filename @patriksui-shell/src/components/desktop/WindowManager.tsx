'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  AppConfig,
  WindowConfig,
  WindowManagerContextValue,
  WindowPosition,
  WindowSize,
} from '@patriksui/shell-types';

const WindowManagerContext = createContext<WindowManagerContextValue | undefined>(undefined);

const STORAGE_KEY = 'patriksui-windows';
const APPS_STORAGE_KEY = 'patriksui-apps';

interface WindowManagerProviderProps {
  children: ReactNode;
  apps?: AppConfig[];
}

let nextZIndex = 100;

function generateWindowId(): string {
  return `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function WindowManagerProvider({ children, apps = [] }: WindowManagerProviderProps) {
  const [registeredApps, setRegisteredApps] = useState<AppConfig[]>(apps);
  const [windows, setWindows] = useState<WindowConfig[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  // Load persisted windows on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWindows(parsed);
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist windows on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(windows));
  }, [windows]);

  const registerApp = useCallback((app: AppConfig) => {
    setRegisteredApps((prev) => {
      if (prev.some((a) => a.id === app.id)) {
        return prev;
      }
      return [...prev, app];
    });
  }, []);

  const openWindow = useCallback(
    (appId: string) => {
      const app = registeredApps.find((a) => a.id === appId);
      if (!app) {
        console.warn(`App with id "${appId}" not found`);
        return;
      }

      const windowId = generateWindowId();
      nextZIndex += 1;

      const newWindow: WindowConfig = {
        id: windowId,
        title: app.name,
        position: { x: 100 + (windows.length % 5) * 30, y: 100 + (windows.length % 5) * 30 },
        size: app.defaultSize ?? { width: 600, height: 400 },
        minSize: app.minSize,
        state: 'normal',
        zIndex: nextZIndex,
        resizable: app.resizable ?? true,
        draggable: true,
      };

      setWindows((prev) => [...prev, newWindow]);
      setActiveWindowId(windowId);
    },
    [registeredApps, windows.length]
  );

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
    setActiveWindowId((prev) => (prev === windowId ? null : prev));
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, state: 'minimized' } : w
      )
    );
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId
          ? { ...w, state: w.state === 'maximized' ? 'normal' : 'maximized' }
          : w
      )
    );
  }, []);

  const restoreWindow = useCallback((windowId: string) => {
    nextZIndex += 1;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, state: 'normal', zIndex: nextZIndex } : w
      )
    );
    setActiveWindowId(windowId);
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    nextZIndex += 1;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, zIndex: nextZIndex } : w
      )
    );
    setActiveWindowId(windowId);
  }, []);

  const updateWindowPosition = useCallback((windowId: string, position: WindowPosition) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, position } : w
      )
    );
  }, []);

  const updateWindowSize = useCallback((windowId: string, size: WindowSize) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, size } : w
      )
    );
  }, []);

  const value = useMemo<WindowManagerContextValue>(
    () => ({
      windows,
      registeredApps, // Expose this
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
    }),
    [
      windows,
      registeredApps,
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
    ]
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager(): WindowManagerContextValue {
  const context = useContext(WindowManagerContext);
  if (context === undefined) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
}

// App registration context
const AppRegistryContext = createContext<{
  apps: AppConfig[];
  registerApp: (app: AppConfig) => void;
}>({ apps: [], registerApp: () => {} });

export function useAppRegistry() {
  return useContext(AppRegistryContext);
}
