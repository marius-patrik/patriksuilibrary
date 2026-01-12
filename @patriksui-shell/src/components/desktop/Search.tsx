'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Command } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { AppConfig } from '@patriksui/shell-types';

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppConfig[];
  onLaunch: (appId: string) => void;
}

export function Search({ isOpen, onClose, apps, onLaunch }: SearchProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter apps
  const results = useMemo(() => {
    if (!query) return apps.slice(0, 5); // Show recent/all if empty? Or just 5.
    return apps.filter(app => 
      app.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, apps]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          onLaunch(results[selectedIndex].id);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, onLaunch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/20 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[70] px-4"
          >
            <div className={cn(
               "flex flex-col rounded-2xl overflow-hidden",
               "bg-background/60 backdrop-blur-3xl border border-border/20 shadow-2xl ring-1 ring-white/10"
            )}>
              {/* Input Area */}
              <div className="flex items-center h-16 px-4 border-b border-border/10">
                <SearchIcon className="w-6 h-6 text-muted-foreground mr-3" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Spotlight Search"
                  className="flex-1 bg-transparent border-none outline-none text-2xl placeholder:text-muted-foreground/50 font-light"
                />
                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded">
                   <Command className="w-3 h-3" />
                   <span>Space</span>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                 {results.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                       No results found
                    </div>
                 ) : (
                    <div className="flex flex-col gap-1">
                       {results.map((app, index) => (
                          <button
                             key={app.id}
                             onClick={() => {
                                onLaunch(app.id);
                                onClose();
                             }}
                             className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors text-left group",
                                index === selectedIndex ? "bg-primary/20 text-primary" : "hover:bg-muted/30 text-foreground"
                             )}
                             onMouseEnter={() => setSelectedIndex(index)}
                          >
                             <div className="w-8 h-8 flex items-center justify-center text-xl">
                                {app.icon}
                             </div>
                             <div className="flex flex-col flex-1">
                                <span className={cn("font-medium", index === selectedIndex && "font-semibold")}>
                                   {app.name}
                                </span>
                                {index === selectedIndex && (
                                   <span className="text-xs opacity-70">App</span>
                                )}
                             </div>
                             {index === selectedIndex && (
                                <div className="text-xs opacity-50 px-2">
                                   Enter to open
                                </div>
                             )}
                          </button>
                       ))}
                    </div>
                 )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
