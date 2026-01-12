'use client';

import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import type { DesktopIconProps } from '@patriksui/shell-types';
import { cn } from '../../lib/utils';

export const DesktopIcon = memo(
  ({ id, label, icon, selected = false, onDoubleClick, className }: DesktopIconProps) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        dragConstraints={{ left: 0, top: 0, right: 400, bottom: 400 }}
        className={cn(
          'flex flex-col items-center gap-2 p-3 rounded-2xl cursor-pointer',
          'select-none transition-all',
          'bg-background/30 backdrop-blur-xl border border-border/20',
          selected && 'bg-primary/30 shadow-xl',
          !selected && 'hover:bg-background/40 hover:shadow-lg',
          className
        )}
        style={{ width: 90 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onPointerDown={() => setIsPressed(true)}
        onPointerUp={() => setIsPressed(false)}
        onPointerLeave={() => setIsPressed(false)}
        onDoubleClick={onDoubleClick}
      >
        {/* Icon */}
        <motion.div
          className={cn(
            'w-16 h-16 flex items-center justify-center',
            'rounded-2xl bg-gradient-to-br from-primary/10 to-background/20',
            'backdrop-blur-sm border border-border/30 shadow-xl'
          )}
          animate={{ scale: isPressed ? 0.9 : 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        >
          <span className="w-10 h-10 flex items-center justify-center">{icon}</span>
        </motion.div>

        {/* Label */}
        <span
          className={cn(
            'text-xs font-medium text-center',
            'text-foreground/90 drop-shadow-sm',
            'line-clamp-2 max-w-full px-1'
          )}
        >
          {label}
        </span>
      </motion.div>
    );
  }
);

DesktopIcon.displayName = 'DesktopIcon';
