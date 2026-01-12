import { ReactNode } from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowProps {
  id: string;
  title: string;
  position: { x: number; y: number };
  size: WindowSize;
  isActive: boolean;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  icon?: ReactNode;
  className?: string;
  resizable?: boolean;
  minSize?: WindowSize;
  children?: ReactNode;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, pos: { x: number; y: number }) => void;
  onResize: (id: string, size: WindowSize) => void;
}

export type WindowPosition = { x: number; y: number };


export interface WindowConfig {
  id: string;
  title: string;
  position: WindowPosition;
  size: WindowSize;
  minSize?: WindowSize;
  state: 'normal' | 'minimized' | 'maximized';
  zIndex: number;
  resizable: boolean;
  draggable: boolean;
}

import type { AppConfig } from './app';

export interface WindowManagerContextValue {
  windows: WindowConfig[];
  registeredApps: AppConfig[];
  activeWindowId: string | null;
  openWindow: (appId: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  restoreWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, position: WindowPosition) => void;
  updateWindowSize: (windowId: string, size: WindowSize) => void;
}
