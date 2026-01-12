import { ReactNode, HTMLAttributes } from 'react';

// Desktop Types
export interface DesktopProps extends HTMLAttributes<HTMLDivElement> {
  wallpaper?: ReactNode;
  gridSnap?: boolean;
  gridSize?: number;
  children?: ReactNode;
}

export interface DesktopIconProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  label: string;
  icon: ReactNode;
  selected?: boolean;
  onDoubleClick?: () => void;
}

// Dock Types
export type DockPosition = 'bottom' | 'left' | 'right';

export interface DockItem {
  id: string;
  label: string;
  icon: ReactNode;
  appId: string;
  pinned?: boolean;
  running?: boolean;
}

export interface DockProps extends HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  position?: DockPosition;
  autoHide?: boolean;
  magnification?: boolean;
  onItemClick?: (appId: string) => void;
  onItemPin?: (appId: string) => void;
  onItemUnpin?: (appId: string) => void;
}
