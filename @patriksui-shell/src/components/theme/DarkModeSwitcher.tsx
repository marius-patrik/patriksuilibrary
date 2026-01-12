'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { DarkModeSwitcherProps } from '@patriksui/shell-types';
import { useTheme } from './ThemeProvider';
import { cn } from '../../lib/utils';

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const iconSizes = {
  sm: 14,
  md: 18,
  lg: 22,
};

export const DarkModeSwitcher = forwardRef<HTMLButtonElement, DarkModeSwitcherProps>(
  ({ size = 'md', showLabel = false, className, ...props }, ref) => {
    const { resolvedTheme, setTheme, theme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    const handleClick = () => {
      // Cycle through: light -> dark -> system -> light
      if (theme === 'light') {
        setTheme('dark');
      } else if (theme === 'dark') {
        setTheme('system');
      } else {
        setTheme('light');
      }
    };

    const iconSize = iconSizes[size];

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full',
          'bg-background/50 backdrop-blur-sm border border-border/50',
          'hover:bg-background/80 transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-ring/50',
          sizeClasses[size],
          className
        )}
        aria-label={`Current theme: ${theme}. Click to cycle themes.`}
        {...props}
      >
        <div className="relative">
          {/* Sun icon */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground"
            initial={false}
            animate={{
              scale: isDark ? 0 : 1,
              opacity: isDark ? 0 : 1,
              rotate: isDark ? -90 : 0,
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </motion.svg>

          {/* Moon icon */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute inset-0 text-foreground"
            initial={false}
            animate={{
              scale: isDark ? 1 : 0,
              opacity: isDark ? 1 : 0,
              rotate: isDark ? 0 : 90,
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </motion.svg>
        </div>

        {showLabel && (
          <span className="ml-2 text-sm font-medium text-foreground capitalize">
            {theme}
          </span>
        )}
      </button>
    );
  }
);

DarkModeSwitcher.displayName = 'DarkModeSwitcher';
