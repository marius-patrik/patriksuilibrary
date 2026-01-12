'use client';

import { forwardRef, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DockProps, DockItem } from '@patriksui/shell-types';
import { cn } from '../../lib/utils';

export const Dock = memo(forwardRef<HTMLDivElement, DockProps>(
  (
    {
      items,
      position = 'bottom',
      autoHide = false,
      magnification = true,
      onItemClick,
      onItemPin,
      onItemUnpin,
      className,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(!autoHide);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const isHorizontal = position === 'bottom';

    const getScale = (index: number): number => {
      if (!magnification || hoveredIndex === null) return 1;
      const distance = Math.abs(index - hoveredIndex);
      if (distance === 0) return 1.5;
      if (distance === 1) return 1.3;
      if (distance === 2) return 1.1;
      return 1;
    };

    const handleMouseEnter = () => {
      if (autoHide) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      if (autoHide) setIsVisible(false);
      setHoveredIndex(null);
    };

    const positionClasses = {
      bottom: 'bottom-2 left-1/2 -translate-x-1/2 flex-row',
      left: 'left-2 top-1/2 -translate-y-1/2 flex-col',
      right: 'right-2 top-1/2 -translate-y-1/2 flex-col',
    } as const;

    const hiddenTransform = {
      bottom: { y: 100, opacity: 0 },
      left: { x: -100, opacity: 0 },
      right: { x: 100, opacity: 0 },
    } as const;

    const visibleTransform = {
      y: 0,
      x: 0,
      opacity: 1,
    };

    return (
      <>
        {/* Auto-hide trigger area */}
        {autoHide && (
          <div
            className={cn(
              'absolute z-40',
              position === 'bottom' && 'bottom-0 left-0 right-0 h-2',
              position === 'left' && 'left-0 top-0 bottom-0 w-2',
              position === 'right' && 'right-0 top-0 bottom-0 w-2'
            )}
            onMouseEnter={handleMouseEnter}
          />
        )}

        <AnimatePresence>
          {isVisible && (
            <motion.div
              ref={ref}
              className={cn(
                'absolute z-50 flex items-end gap-1 p-2',
                'bg-background/40 backdrop-blur-2xl',
                'border border-border/20 shadow-2xl',
                'rounded-3xl',
                positionClasses[position],
                className
              )}
              initial={autoHide ? hiddenTransform[position] : false}
              animate={visibleTransform}
              exit={hiddenTransform[position]}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onMouseLeave={handleMouseLeave}
            >
              {items.map((item, index) => (
                <DockItemComponent
                  key={item.id}
                  item={item}
                  index={index}
                  scale={getScale(index)}
                  magnification={magnification}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => onItemClick?.(item.appId)}
                  onPin={() => onItemPin?.(item.appId)}
                  onUnpin={() => onItemUnpin?.(item.appId)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  })
);

Dock.displayName = 'Dock';

// Individual dock item
interface DockItemComponentProps {
  item: DockItem;
  index: number;
  scale: number;
  magnification: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  onPin: () => void;
  onUnpin: () => void;
}

function DockItemComponent({
  item,
  index,
  scale,
  magnification,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onPin,
  onUnpin,
}: DockItemComponentProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(true);
  };

  return (
    <div className="relative">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !showContextMenu && (
          <motion.div
            className={cn(
              'absolute -top-10 left-1/2 -translate-x-1/2',
              'px-2 py-1 rounded-md',
              'bg-foreground text-background text-xs font-medium',
              'whitespace-nowrap'
            )}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Context menu */}
      <AnimatePresence>
        {showContextMenu && (
          <>
            <div
              className="fixed inset-0 z-50"
              onClick={() => setShowContextMenu(false)}
            />
            <motion.div
              className={cn(
                'absolute -top-20 left-1/2 -translate-x-1/2 z-50',
                'p-1 rounded-lg min-w-[120px]',
                'bg-background/90 backdrop-blur-xl border border-border shadow-xl'
              )}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <button
                type="button"
                className="w-full px-3 py-1.5 text-left text-sm rounded hover:bg-accent"
                onClick={() => {
                  onClick();
                  setShowContextMenu(false);
                }}
              >
                Open
              </button>
              {item.pinned ? (
                <button
                  type="button"
                  className="w-full px-3 py-1.5 text-left text-sm rounded hover:bg-accent"
                  onClick={() => {
                    onUnpin();
                    setShowContextMenu(false);
                  }}
                >
                  Remove from Dock
                </button>
              ) : (
                <button
                  type="button"
                  className="w-full px-3 py-1.5 text-left text-sm rounded hover:bg-accent"
                  onClick={() => {
                    onPin();
                    setShowContextMenu(false);
                  }}
                >
                  Keep in Dock
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Dock icon */}
      <motion.button
        type="button"
        className={cn(
          'relative flex items-center justify-center',
          'w-12 h-12 rounded-xl',
          'bg-gradient-to-b from-white/10 to-white/5',
          'border border-white/10',
          'shadow-lg hover:shadow-xl',
          'transition-shadow'
        )}
        style={{ originY: 1 }}
        animate={{ scale: magnification ? scale : 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        onMouseEnter={() => {
          onMouseEnter();
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          onMouseLeave();
          setShowTooltip(false);
        }}
        onClick={onClick}
        onContextMenu={handleContextMenu}
      >
        <span className="w-8 h-8">{item.icon}</span>
      </motion.button>

      {/* Running indicator */}
      {item.running && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground/60" />
      )}
    </div>
  );
}
