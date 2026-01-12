'use client';

import { forwardRef } from 'react';
import type { HeaderProps } from '@patriksui/shell-types';
import { cn } from '../../lib/utils';

/**
 * Header component for the Shell.
 * Displays title, navigation items based on variant, and optional custom content.
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ variant, items, activeItem, onItemClick, children, className, ...props }, ref) => {
    // Desktop variant - macOS style menu bar
    if (variant === 'desktop') {
      return (
        <header
          ref={ref}
          className={cn(
            'flex items-center h-7 px-4',
            'bg-background/80 backdrop-blur-xl',
            'border-b border-border/50',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="font-bold">PatrikSUI</span>
            {items?.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => onItemClick?.(item.key)}
                className={cn(
                  'hover:text-foreground/80 transition-colors',
                  activeItem === item.key && 'text-primary'
                )}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            {children}
          </div>
        </header>
      );
    }

    // App variant - iOS style navigation bar
    if (variant === 'app') {
      return (
        <header
          ref={ref}
          className={cn(
            'flex items-center justify-center h-12 px-4',
            className
          )}
          {...props}
        >
          {children}
        </header>
      );
    }

    // Window variant - title bar
    if (variant === 'window') {
      return (
        <header
          ref={ref}
          className={cn(
            'flex items-center h-10 px-3',
            'bg-muted/50 border-b border-border/50',
            'rounded-t-lg',
            className
          )}
          {...props}
        >
          {children}
        </header>
      );
    }

    // Page/Sidebar variant - standard header
    return (
      <header
        ref={ref}
        className={cn(
          'flex items-center h-16 px-6 gap-6',
          className
        )}
        {...props}
      >
        {/* Title */}
        {props.title && (
          <div className="font-semibold text-lg tracking-tight">
            {props.title}
          </div>
        )}

        {/* Navigation Items */}
        {items && items.length > 0 && (
          <nav className="flex items-center gap-6">
            {items.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => onItemClick?.(item.key)}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  activeItem === item.key ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.title}
              </button>
            ))}
          </nav>
        )}

        <div className="flex-1" />
        {children}
      </header>
    );
  }
);

Header.displayName = 'Header';
