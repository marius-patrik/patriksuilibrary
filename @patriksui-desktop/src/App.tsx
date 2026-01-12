'use client';

import { useState } from 'react';
import {
  Shell,
  ThemeProvider,
  Wallpaper,
  DesktopIcon,
  WindowManagerProvider,
  useWindowManager,
  SettingsApp,
  Window,
  Dock,
  ControlPanel
} from '@patriksui/shell';
import { NotesApp, CalendarApp, PhotosApp, MusicApp } from '@patriksui/apps';
import type { DockItem } from '@patriksui/shell-types';
import { FileText, Calendar, Image, Music as MusicIcon, Settings, Box } from 'lucide-react';
import '@patriksui/shell/styles.css';

// Built-in apps configuration
const builtInApps = [
  { id: 'settings', name: 'Settings', icon: <Settings className="w-full h-full text-gray-500" />, component: SettingsApp },
  { id: 'notes', name: 'Notes', icon: <FileText className="w-full h-full text-yellow-500" />, component: NotesApp },
  { id: 'calendar', name: 'Calendar', icon: <Calendar className="w-full h-full text-red-500" />, component: CalendarApp },
  { id: 'photos', name: 'Photos', icon: <Image className="w-full h-full text-blue-500" />, component: PhotosApp },
  { id: 'music', name: 'Music', icon: <MusicIcon className="w-full h-full text-pink-500" />, component: MusicApp },
];

function DesktopContent() {
  const { openWindow, windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, activeWindowId, updateWindowPosition, updateWindowSize } = useWindowManager();
  const [dockPosition, setDockPosition] = useState<'bottom' | 'left' | 'right'>('bottom');
  const [dockAutoHide, setDockAutoHide] = useState(false);
  const [colorScheme, setColorScheme] = useState<'purple' | 'blue' | 'green' | 'sunset' | 'ocean'>('purple');

  const dockItems: DockItem[] = builtInApps.map((app) => ({
    id: app.id,
    label: app.name,
    icon: <div className="p-1">{app.icon}</div>,
    appId: app.id,
    pinned: true,
    running: windows.some((w) => w.title === app.name && w.state !== 'minimized'),
  }));

  const renderAppContent = (appId: string) => {
    switch (appId) {
      case 'settings':
        return (
          <SettingsApp
            onDockPositionChange={setDockPosition}
            onDockAutoHideChange={setDockAutoHide}
            onWallpaperChange={(scheme) => setColorScheme(scheme as typeof colorScheme)}
          />
        );
      case 'notes': return <NotesApp />;
      case 'calendar': return <CalendarApp />;
      case 'photos': return <PhotosApp />;
      case 'music': return <MusicApp />;
      default: return <div className="p-4">App content not found</div>;
    }
  };

  return (
    <>
      <Wallpaper colorScheme={colorScheme} />

      {/* Desktop Icons */}
      <div className="absolute top-4 right-4 grid gap-4 z-10 p-4">
        {builtInApps.slice(0, 4).map((app) => (
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
            .map((win) => (
              <Window
                key={win.id}
                id={win.id}
                title={win.title}
                icon={builtInApps.find(a => a.name === win.title)?.icon}
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
                {renderAppContent(builtInApps.find(a => a.name === win.title)?.id || '')}
              </Window>
            ))}
        </div>
      </div>

      {/* Dock */}
      <Dock
        items={dockItems}
        position={dockPosition}
        autoHide={dockAutoHide}
        magnification
        onItemClick={(id) => {
          const app = builtInApps.find((a) => a.id === id);
          if (app) {
            const win = windows.find((w) => w.title === app.name);
            win ? focusWindow(win.id) : openWindow(id);
          }
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="h-screen w-full overflow-hidden">
          <Shell 
            variant="desktop" 
            title="PatrikSUI OS"
            footerContent={<ControlPanel />}
            headerContent={<div className="px-4 text-xs font-medium opacity-50">PatrikSUI Desktop Environment</div>}
          >
            <WindowManagerProvider apps={builtInApps.map(a => ({ ...a, icon: '📱' }))}>
              <DesktopContent />
            </WindowManagerProvider>
          </Shell>
      </div>
    </ThemeProvider>
  );
}
