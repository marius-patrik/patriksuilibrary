import type { DockPosition } from './desktop';
import type { WindowSize } from './window';
import type { ThemeMode } from './shell';

// =============================================================================
// Library Configuration
// =============================================================================

export interface DesktopConfig {
  wallpaper: WallpaperConfig;
  dock: DockConfig;
  icons: IconGridConfig;
  animations: AnimationConfig;
}

export interface WallpaperConfig {
  type: 'url' | 'color' | 'gradient' | 'component';
  value: string; // URL, color, gradient CSS, or component name
}

export interface DockConfig {
  position: DockPosition;
  autoHide: boolean;
  magnification: boolean;
  iconSize: number;
}

export interface IconGridConfig {
  snapToGrid: boolean;
  gridSize: number;
  iconSize: number;
}

export interface AnimationConfig {
  enabled: boolean;
  reducedMotion: boolean;
  speed: 'slow' | 'normal' | 'fast';
}

export interface PatrikSUIConfig {
  theme: ThemeMode;
  desktop: DesktopConfig;
}

// =============================================================================
// Default Configuration
// =============================================================================

export const defaultConfig: PatrikSUIConfig = {
  theme: 'system',
  desktop: {
    wallpaper: {
      type: 'component',
      value: 'BlobBackground',
    },
    dock: {
      position: 'bottom',
      autoHide: false,
      magnification: true,
      iconSize: 48,
    },
    icons: {
      snapToGrid: true,
      gridSize: 80,
      iconSize: 64,
    },
    animations: {
      enabled: true,
      reducedMotion: false,
      speed: 'normal',
    },
  },
};
