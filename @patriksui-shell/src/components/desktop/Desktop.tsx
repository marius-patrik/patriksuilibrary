'use client';

import { forwardRef } from 'react';
import type { DesktopProps } from '@patriksui/shell-types';
import { cn } from '../../lib/utils';
import { BlobBackground } from '../backgrounds/BlobBackground';

export const Desktop = forwardRef<HTMLDivElement, DesktopProps>(
  (
    {
      wallpaper,
      gridSnap = true,
      gridSize = 80,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full h-full overflow-hidden',
          className
        )}
        {...props}
      >
        {/* Wallpaper layer */}
        <div className="absolute inset-0 z-0">
          {wallpaper ?? <BlobBackground colorScheme="purple" />}
        </div>

        {/* Icons and windows layer */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    );
  }
);

Desktop.displayName = 'Desktop';
