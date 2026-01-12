'use client';

import { useCallback, useEffect, useRef, useState, memo, type ReactNode } from 'react';
import { motion, useDragControls, type PanInfo } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';
import { cn } from '../../lib/utils';

import type { WindowProps } from '@patriksui/shell-types';

export const Window = memo(({
  id,
  title,
  position,
  size,
  isActive,
  children,
  zIndex,
  isMinimized,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  icon,
  className,
  resizable = true,
  minSize = { width: 300, height: 200 },
}: WindowProps) => {


    const dragControls = useDragControls();
    const constraintsRef = useRef<HTMLDivElement>(null);

    const [isResizing, setIsResizing] = useState(false);

    const handleClose = useCallback(() => {
      onClose?.(id);
    }, [id, onClose]);

    const handleMinimize = useCallback(() => {
      onMinimize?.(id);
    }, [id, onMinimize]);

    const handleMaximize = useCallback(() => {
      onMaximize?.(id);
    }, [id, onMaximize]);

    const handleTitleBarDoubleClick = useCallback(() => {
      onMaximize?.(id);
    }, [id, onMaximize]);

    const handleFocus = useCallback(() => {
      onFocus?.(id);
    }, [id, onFocus]);

    const handleDragEnd = useCallback(
      (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        onMove?.(id, {
          x: position.x + info.offset.x,
          y: position.y + info.offset.y,
        });
      },
      [id, position, onMove]
    );

    if (isMinimized) {
      return null;
    }

    const isFullscreen = false; // TODO: Add fullscreen support to props if needed

    const windowStyle = isMaximized || isFullscreen
      ? { top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }
      : { left: position.x, top: position.y, width: size.width, height: size.height };

    return (
      <motion.div
        className={cn(
          'absolute flex flex-col',
          'bg-background/60 backdrop-blur-2xl',
          'border border-border/20 shadow-2xl',
          isMaximized ? 'rounded-none' : 'rounded-2xl',
          isActive && 'ring-1 ring-primary/30',
          className
        )}
        style={{
          ...windowStyle,
          zIndex,
        }}
        drag={!isMaximized && !isFullscreen}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{ left: 0, top: 0 }}
        onDragEnd={handleDragEnd}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onPointerDown={handleFocus}
      >
        {/* Title bar */}
        <div
          className={cn(
            'flex items-center h-10 px-3 cursor-grab active:cursor-grabbing',
            'bg-background/30 backdrop-blur-xl border-b border-border/20',
            isMaximized ? 'rounded-none' : 'rounded-t-2xl',
            'select-none'
          )}
          onDoubleClick={handleTitleBarDoubleClick}
        >
          {/* Traffic light buttons */}
          <div className="flex items-center gap-2 mr-4">
            {/* Close */}
            <button
              type="button"
              onClick={handleClose}
              className={cn(
                'w-3 h-3 rounded-full bg-red-500',
                'hover:bg-red-600 transition-colors',
                'flex items-center justify-center group'
              )}
              aria-label="Close window"
            >
              <svg
                className="w-2 h-2 text-red-900/0 group-hover:text-red-900/80 transition-colors"
                fill="currentColor"
                viewBox="0 0 10 10"
              >
                <path d="M1 1l8 8M1 9l8-8" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>

            {/* Minimize */}
            <button
              type="button"
              onClick={handleMinimize}
              className={cn(
                'w-3 h-3 rounded-full bg-yellow-500',
                'hover:bg-yellow-600 transition-colors',
                'flex items-center justify-center group'
              )}
              aria-label="Minimize window"
            >
              <svg
                className="w-2 h-2 text-yellow-900/0 group-hover:text-yellow-900/80 transition-colors"
                fill="currentColor"
                viewBox="0 0 10 10"
              >
                <path d="M1 5h8" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>

            {/* Maximize */}
            <button
              type="button"
              onClick={handleMaximize}
              className={cn(
                'w-3 h-3 rounded-full bg-green-500',
                'hover:bg-green-600 transition-colors',
                'flex items-center justify-center group'
              )}
              aria-label="Maximize window"
            >
              <svg
                className="w-2 h-2 text-green-900/0 group-hover:text-green-900/80 transition-colors"
                fill="currentColor"
                viewBox="0 0 10 10"
              >
                {isMaximized ? (
                  <path d="M2 3h6v5H2z" stroke="currentColor" strokeWidth="1" fill="none" />
                ) : (
                  <>
                    <path d="M1 4L5 1l4 3" stroke="currentColor" strokeWidth="1.2" fill="none" />
                    <path d="M1 6L5 9l4-3" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Window title */}
          <div className="flex items-center gap-2 flex-1 justify-center overflow-hidden">
            {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
            <span className="text-sm font-medium text-foreground/80 truncate">{title}</span>
          </div>

          {/* Spacer for symmetry */}
          <div className="w-16" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>

        {/* Resize handles */}
        {resizable && !isMaximized && !isFullscreen && (
          <>
            {/* Bottom-right corner */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
              onPointerDown={(e) => {
                e.stopPropagation();
                setIsResizing(true);
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = size.width;
                const startHeight = size.height;

                const handleMove = (moveEvent: PointerEvent) => {
                  const newWidth = Math.max(minSize.width, startWidth + (moveEvent.clientX - startX));
                  const newHeight = Math.max(minSize.height, startHeight + (moveEvent.clientY - startY));
                  onResize?.(id, { width: newWidth, height: newHeight });
                };

                const handleUp = () => {
                  setIsResizing(false);
                  window.removeEventListener('pointermove', handleMove);
                  window.removeEventListener('pointerup', handleUp);
                };

                window.addEventListener('pointermove', handleMove);
                window.addEventListener('pointerup', handleUp);
              }}
            />
          </>
        )}
      </motion.div>
    );
  }
);

Window.displayName = 'Window';
