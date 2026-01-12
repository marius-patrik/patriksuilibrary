'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface BlobBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  colorScheme?: 'purple' | 'blue' | 'green' | 'sunset' | 'ocean';
  animated?: boolean;
  blur?: number;
}

const colorSchemes = {
  purple: {
    blob1: 'bg-purple-500/40',
    blob2: 'bg-pink-500/40',
    blob3: 'bg-indigo-500/40',
    blob4: 'bg-violet-500/40',
  },
  blue: {
    blob1: 'bg-blue-500/40',
    blob2: 'bg-cyan-500/40',
    blob3: 'bg-sky-500/40',
    blob4: 'bg-indigo-500/40',
  },
  green: {
    blob1: 'bg-green-500/40',
    blob2: 'bg-emerald-500/40',
    blob3: 'bg-teal-500/40',
    blob4: 'bg-lime-500/40',
  },
  sunset: {
    blob1: 'bg-orange-500/40',
    blob2: 'bg-red-500/40',
    blob3: 'bg-pink-500/40',
    blob4: 'bg-yellow-500/40',
  },
  ocean: {
    blob1: 'bg-blue-600/40',
    blob2: 'bg-teal-500/40',
    blob3: 'bg-cyan-400/40',
    blob4: 'bg-indigo-600/40',
  },
};

export const BlobBackground = forwardRef<HTMLDivElement, BlobBackgroundProps>(
  ({ colorScheme = 'purple', animated = true, blur = 80, className, ...props }, ref) => {
    const colors = colorSchemes[colorScheme];

    const blobVariants = {
      animate: (i: number) => ({
        x: [0, 100 * Math.sin(i), -50 * Math.cos(i), 0],
        y: [0, -80 * Math.cos(i), 60 * Math.sin(i), 0],
        scale: [1, 1.1, 0.9, 1],
        transition: {
          duration: 20 + i * 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut' as const,
        },
      }),
    };

    return (
      <div
        ref={ref}
        className={cn(
          'absolute inset-0 overflow-hidden bg-background',
          className
        )}
        {...props}
      >
        {/* Background gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />

        {/* Animated blobs */}
        <motion.div
          className={cn(
            'absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full',
            colors.blob1
          )}
          style={{ filter: `blur(${blur}px)` }}
          custom={1}
          animate={animated ? 'animate' : undefined}
          variants={blobVariants}
        />
        <motion.div
          className={cn(
            'absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full',
            colors.blob2
          )}
          style={{ filter: `blur(${blur}px)` }}
          custom={2}
          animate={animated ? 'animate' : undefined}
          variants={blobVariants}
        />
        <motion.div
          className={cn(
            'absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full',
            colors.blob3
          )}
          style={{ filter: `blur(${blur}px)` }}
          custom={3}
          animate={animated ? 'animate' : undefined}
          variants={blobVariants}
        />
        <motion.div
          className={cn(
            'absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full',
            colors.blob4
          )}
          style={{ filter: `blur(${blur}px)` }}
          custom={4}
          animate={animated ? 'animate' : undefined}
          variants={blobVariants}
        />

        {/* Noise overlay for texture */}
        <div 
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    );
  }
);

BlobBackground.displayName = 'BlobBackground';
