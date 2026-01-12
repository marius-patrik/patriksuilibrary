'use client';

import { forwardRef } from 'react';
import type { FooterProps } from '@patriksui/shell-types';
import { cn } from '../../lib/utils';

/**
 * Footer component for the Shell.
 * Displays status information or navigation items.
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ variant, items, activeItem, onItemClick, children, className, ...props }, ref) => {
    // Desktop variant - no default footer (dock is separate)
    if (variant === 'desktop') {
      return children ? (
        <footer ref={ref} className={cn('', className)} {...props}>
          {children}
        </footer>
      ) : null;
    }

    // App variant - iOS style tab bar
    if (variant === 'app') {
      return (
        <footer
          ref={ref}
          className={cn(
            'flex items-center justify-around h-20 px-4 pb-6',
            className
          )}
          {...props}
        >
          {items?.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onItemClick?.(item.key)}
              className={cn(
                'flex flex-col items-center gap-1 p-2 rounded-lg transition-colors',
                activeItem === item.key
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.icon && <span className="w-6 h-6">{item.icon}</span>}
              <span className="text-xs font-medium">{item.title}</span>
            </button>
          ))}
          {children}
        </footer>
      );
    }

    // Page/Sidebar variant - standard footer
    return (
      <footer
        ref={ref}
        className={cn(
          'flex items-center justify-center h-16 px-6',
          'border-t border-border text-sm text-muted-foreground',
          className
        )}
        {...props}
      >
        {children}
      </footer>
    );
  }
);

Footer.displayName = 'Footer';
