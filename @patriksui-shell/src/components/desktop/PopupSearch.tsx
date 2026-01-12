'use client';

import { forwardRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useWindowManager } from './WindowManager';
import type { AppConfig } from '@patriksui/shell-types';

interface PopupSearchProps {
  apps: AppConfig[];
  isOpen: boolean;
  onClose: () => void;
}

export const PopupSearch = forwardRef<HTMLDivElement, PopupSearchProps>(
  ({ apps, isOpen, onClose }, ref) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { openWindow } = useWindowManager();

    const filteredApps = useMemo(() => {
      if (!query.trim()) return apps;
      const lowerQuery = query.toLowerCase();
      return apps.filter((app) =>
        app.name.toLowerCase().includes(lowerQuery)
      );
    }, [apps, query]);

    // Reset state when opening
    useEffect(() => {
      if (isOpen) {
        setQuery('');
        setSelectedIndex(0);
      }
    }, [isOpen]);

    // Keep selected index in bounds
    useEffect(() => {
      if (selectedIndex >= filteredApps.length) {
        setSelectedIndex(Math.max(0, filteredApps.length - 1));
      }
    }, [filteredApps.length, selectedIndex]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex((prev) =>
              prev < filteredApps.length - 1 ? prev + 1 : prev
            );
            break;
          case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
            break;
          case 'Enter':
            e.preventDefault();
            if (filteredApps[selectedIndex]) {
              openWindow(filteredApps[selectedIndex].id);
              onClose();
            }
            break;
          case 'Escape':
            e.preventDefault();
            onClose();
            break;
        }
      },
      [filteredApps, selectedIndex, openWindow, onClose]
    );

    const handleAppClick = useCallback(
      (appId: string) => {
        openWindow(appId);
        onClose();
      },
      [openWindow, onClose]
    );

    // Global keyboard shortcut (Cmd+Space)
    useEffect(() => {
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
          e.preventDefault();
          // This would be handled by parent component
        }
      };

      window.addEventListener('keydown', handleGlobalKeyDown);
      return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Search modal */}
            <motion.div
              ref={ref}
              className={cn(
                'fixed left-1/2 top-1/4 z-[9999]',
                'w-full max-w-xl',
                '-translate-x-1/2'
              )}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div
                className={cn(
                  'overflow-hidden rounded-2xl',
                  'bg-background/80 backdrop-blur-2xl',
                  'border border-border/50 shadow-2xl'
                )}
              >
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
                  <svg
                    className="w-5 h-5 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search apps..."
                    className={cn(
                      'flex-1 bg-transparent text-lg',
                      'placeholder:text-muted-foreground/50',
                      'focus:outline-none'
                    )}
                    autoFocus
                  />
                  <span className="text-xs text-muted-foreground px-2 py-1 rounded bg-muted/50">
                    ⌘ Space
                  </span>
                </div>

                {/* Results */}
                {filteredApps.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto p-2">
                    {filteredApps.map((app, index) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => handleAppClick(app.id)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2 rounded-lg',
                          'text-left transition-colors',
                          index === selectedIndex
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted/50'
                        )}
                      >
                        <span className="w-8 h-8 flex items-center justify-center">
                          {app.icon}
                        </span>
                        <span className="font-medium">{app.name}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    No apps found
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
);

PopupSearch.displayName = 'PopupSearch';
