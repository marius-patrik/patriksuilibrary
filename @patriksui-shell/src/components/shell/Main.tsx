'use client';

import { forwardRef } from 'react';
import type { MainProps } from '@patriksui/shell-types';
import { cn } from '../../lib/utils';

/**
 * Main content area component for the Shell.
 * Wraps the primary application content.
 */
export const Main = forwardRef<HTMLElement, MainProps>(
  ({ variant, children, className, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(
          'relative',
          variant === 'desktop' && 'flex-1 overflow-hidden',
          variant === 'app' && 'px-4 py-6',
          variant === 'window' && 'p-4',
          variant === 'page' && 'container mx-auto px-6 py-8',
          variant === 'sidebar' && 'p-6',
          className
        )}
        {...props}
      >
        {children}
      </main>
    );
  }
);

Main.displayName = 'Main';
