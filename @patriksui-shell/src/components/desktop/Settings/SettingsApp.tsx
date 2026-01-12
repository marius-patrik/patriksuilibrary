'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../theme/ThemeProvider';
import { cn } from '../../../lib/utils';
import type { DockPosition } from '@patriksui/shell-types';

interface SettingsAppProps {
  onDockPositionChange?: (position: DockPosition) => void;
  onDockAutoHideChange?: (autoHide: boolean) => void;
  onWallpaperChange?: (colorScheme: string) => void;
}

export function SettingsApp({
  onDockPositionChange,
  onDockAutoHideChange,
  onWallpaperChange,
}: SettingsAppProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('appearance');
  const [dockPosition, setDockPosition] = useState<DockPosition>('bottom');
  const [dockAutoHide, setDockAutoHide] = useState(false);
  const [wallpaperScheme, setWallpaperScheme] = useState('purple');

  const sections = [
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'dock', label: 'Dock', icon: '📍' },
    { id: 'wallpaper', label: 'Wallpaper', icon: '🖼️' },
  ];

  const wallpaperSchemes = [
    { id: 'purple', label: 'Purple', colors: ['#a855f7', '#ec4899', '#6366f1'] },
    { id: 'blue', label: 'Ocean Blue', colors: ['#3b82f6', '#06b6d4', '#0ea5e9'] },
    { id: 'green', label: 'Forest', colors: ['#22c55e', '#10b981', '#14b8a6'] },
    { id: 'sunset', label: 'Sunset', colors: ['#f97316', '#ef4444', '#ec4899'] },
    { id: 'ocean', label: 'Deep Ocean', colors: ['#2563eb', '#14b8a6', '#22d3ee'] },
  ];

  const handleDockPositionChange = (position: DockPosition) => {
    setDockPosition(position);
    onDockPositionChange?.(position);
  };

  const handleDockAutoHideChange = (autoHide: boolean) => {
    setDockAutoHide(autoHide);
    onDockAutoHideChange?.(autoHide);
  };

  const handleWallpaperChange = (scheme: string) => {
    setWallpaperScheme(scheme);
    onWallpaperChange?.(scheme);
  };

  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
      <div className="w-56 border-r border-border bg-muted/30 p-4">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left',
                'transition-colors',
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent'
              )}
            >
              <span>{section.icon}</span>
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Appearance */}
        {activeSection === 'appearance' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Appearance</h3>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-muted-foreground">
                Theme
              </label>
              <div className="flex gap-3">
                {(['light', 'dark', 'system'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTheme(mode)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-4 rounded-xl border-2',
                      'transition-colors',
                      theme === mode
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div
                      className={cn(
                        'w-16 h-12 rounded-lg border',
                        mode === 'light' && 'bg-white border-gray-200',
                        mode === 'dark' && 'bg-gray-900 border-gray-700',
                        mode === 'system' && 'bg-gradient-to-r from-white to-gray-900 border-gray-400'
                      )}
                    />
                    <span className="text-sm font-medium capitalize">{mode}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dock */}
        {activeSection === 'dock' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Dock</h3>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-muted-foreground">
                Position
              </label>
              <div className="flex gap-3">
                {(['bottom', 'left', 'right'] as const).map((pos) => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => handleDockPositionChange(pos)}
                    className={cn(
                      'flex items-center justify-center w-24 h-20 rounded-xl border-2',
                      'transition-colors relative',
                      dockPosition === pos
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <div className="w-12 h-12 border border-dashed border-muted-foreground/50 rounded relative">
                      <div
                        className={cn(
                          'absolute bg-muted-foreground/60 rounded-sm',
                          pos === 'bottom' && 'bottom-1 left-1 right-1 h-1',
                          pos === 'left' && 'left-1 top-1 bottom-1 w-1',
                          pos === 'right' && 'right-1 top-1 bottom-1 w-1'
                        )}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Auto-hide Dock</div>
                <div className="text-sm text-muted-foreground">
                  Hide the dock when not in use
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDockAutoHideChange(!dockAutoHide)}
                className={cn(
                  'relative w-12 h-7 rounded-full transition-colors',
                  dockAutoHide ? 'bg-primary' : 'bg-muted'
                )}
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow"
                  animate={{ left: dockAutoHide ? 26 : 4 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                />
              </button>
            </div>
          </div>
        )}

        {/* Wallpaper */}
        {activeSection === 'wallpaper' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Wallpaper</h3>

            <div className="grid grid-cols-3 gap-4">
              {wallpaperSchemes.map((scheme) => (
                <button
                  key={scheme.id}
                  type="button"
                  onClick={() => handleWallpaperChange(scheme.id)}
                  className={cn(
                    'aspect-video rounded-xl border-2 overflow-hidden',
                    'transition-colors',
                    wallpaperScheme === scheme.id
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(135deg, ${scheme.colors.join(', ')})`,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

SettingsApp.displayName = 'SettingsApp';
