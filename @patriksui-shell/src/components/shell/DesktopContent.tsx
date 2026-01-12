'use client';

import { useState, useEffect } from 'react';
import {
  useWindowManager,
  useAppRegistry,
  DesktopIcon,
  Window,
  Dock,
  Search
} from '../../index';
import { cn } from '@/lib/utils';
import type { DockItem, AppConfig } from '@patriksui/shell-types';

/**
 * Internal component to render Desktop content (Icons, Windows, Dock).
 * Must be used within WindowManagerProvider.
 */
export function DesktopShellContent() {
  const { 
    windows, 
    activeWindowId, 
    openWindow, 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    focusWindow, 
    updateWindowPosition, 
    updateWindowSize,
    registeredApps,
  } = useWindowManager();

  // const { apps } = useAppRegistry(); // Removed unused hook usage

  // For Dock state
  const [dockPosition, setDockPosition] = useState<'bottom' | 'left' | 'right'>('bottom');
  const [dockAutoHide, setDockAutoHide] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Map apps to Dock items
  const dockItems: DockItem[] = registeredApps.map((app: AppConfig) => ({
    id: app.id,
    label: app.name,
    icon: <div className="p-1 text-2xl">{app.icon}</div>, // Ensure icon is ReactNode
    appId: app.id,
    pinned: true,
    running: windows.some((w) => w.title === app.name && w.state !== 'minimized'),
  }));

  // renderAppContent removed

  return (
    <>
      <Search 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        apps={registeredApps} 
        onLaunch={openWindow} 
      />

      {/* Desktop Icons */}
      <div className="absolute top-4 right-4 grid gap-4 z-10 p-4">
        {registeredApps.slice(0, 4).map((app: AppConfig) => (
          <DesktopIcon
            key={app.id}
            id={app.id}
            label={app.name}
            icon={<div className="text-4xl">{app.icon}</div>}
            onDoubleClick={() => openWindow(app.id)}
          />
        ))}
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="pointer-events-auto h-full w-full">
          {windows
            .filter((w) => w.state !== 'minimized')
            .map((win) => {
              const app = registeredApps.find((a: AppConfig) => a.name === win.title);
              // Use component from config if available
              const AppComp = app?.component;

              return (
              <Window
                key={win.id}
                id={win.id}
                title={win.title}
                icon={app?.icon}
                position={win.position}
                size={win.size}
                isActive={win.id === activeWindowId}
                zIndex={win.zIndex}
                isMinimized={win.state === 'minimized'}
                isMaximized={win.state === 'maximized'}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onMaximize={() => maximizeWindow(win.id)}
                onFocus={() => focusWindow(win.id)}
                onMove={(id, pos) => updateWindowPosition(id, pos)}
                onResize={(id, size) => updateWindowSize(id, size)}
              >
                {AppComp ? <AppComp /> : <div className="p-4">App not found</div>}
              </Window>
            )})}
        </div>
      </div>

      {/* Dock (In Main Content? No, moving to footer) */}
      {/* We removed Dock from here in previous attempts but looks like it's back in view_file? */}
      {/* The view_file lines 107-119 show Dock being rendered in DesktopShellContent! */}
      {/* If I want Dock in Footer, I should remove it from here and put in DesktopDockFooter */}
    </>
  );
}

export function DesktopDockFooter() {
    const { 
        windows, 
        openWindow, 
        focusWindow, 
        registeredApps 
    } = useWindowManager();

    const [dockPosition, setDockPosition] = useState<'bottom' | 'left' | 'right'>('bottom');
    const [dockAutoHide, setDockAutoHide] = useState(false);
  
    const dockItems: DockItem[] = registeredApps.map((app: AppConfig) => ({
        id: app.id,
        label: app.name,
        icon: <div className="p-1 text-2xl">{app.icon}</div>,
        appId: app.id,
        pinned: true,
        running: windows.some((w) => w.title === app.name && w.state !== 'minimized'),
    }));

    return (
        <div className="pointer-events-auto">
             <Dock
                items={dockItems}
                position={dockPosition}
                autoHide={dockAutoHide}
                magnification
                onItemClick={(id) => {
                const app = registeredApps.find((a: AppConfig) => a.id === id);
                if (app) {
                    const win = windows.find((w) => w.title === app.name);
                    win ? focusWindow(win.id) : openWindow(id);
                }
                }}
            />
        </div>
    );
}
