import type { ComponentType, HTMLAttributes, ReactNode } from 'react';

// =============================================================================
// Shell Variants
// =============================================================================

// =============================================================================
// Shell Variants
// =============================================================================

/**
 * Available variants for the main Shell layout.
 * - 'desktop': Full desktop environment with windows and taskbar
 * - 'app': Wrapper for individual desktop apps
 * - 'window': Standalone window
 * - 'page': Standard web page with navbar
 * - 'sidebar': Page with sidebar navigation
 */
export type ShellVariant = 'desktop' | 'app' | 'window' | 'page' | 'sidebar' | 'router';

/**
 * Variants for individual ShellItems (routes).
 * - 'page': Render links in header navbar (default)
 * - 'sidebar': Render links in sidebar
 * - 'app': Desktop application
 */
export type ShellItemVariant = 'page' | 'app' | 'sidebar';

// =============================================================================
// ShellItem Props (for routing/menu items)
// =============================================================================

export interface ShellItemProps {
  /** Title shown in menu/navigation */
  title: string;
  /** Icon for the item (optional) */
  icon?: ReactNode;
  /** Variant type: 'page' for shell content, 'app' for desktop apps, 'sidebar' for sidebar links */
  variant?: ShellItemVariant;
  /** Content to render */
  children: ReactNode;
  /** Default size when opened as window (for 'app' variant) */
  defaultSize?: { width: number; height: number };
}

// =============================================================================
// Shell Props
// =============================================================================

import type { AppConfig } from './app';

export interface ShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Shell variant type determining the overall layout */
  variant: ShellVariant;
  /** Background apps config for Shell */
  apps?: AppConfig[];
  /** Title of the shell/application (displayed in Header/Sidebar) */
  title?: string;
  /** Custom wallpaper/background component */
  wallpaper?: ReactNode;
  /** Header content */
  headerContent?: ReactNode;
  /** Footer content */
  footerContent?: ReactNode;
  /** Main content (legacy - prefer using Shell.Item children) */
  mainContent?: ReactNode;

  /** Active route/item key */
  activeItem?: string;
  /** Callback when item changes */
  onItemChange?: (key: string) => void;

  // Component overrides
  HeaderComponent?: ComponentType<HeaderProps>;
  FooterComponent?: ComponentType<FooterProps>;
  MainComponent?: ComponentType<MainProps>;
}

// =============================================================================
// Layout Component Props
// =============================================================================

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  variant?: ShellVariant;
  title?: string;
  items?: { key: string; title: string; icon?: ReactNode }[];
  activeItem?: string;
  onItemClick?: (key: string) => void;
  children?: ReactNode;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  variant?: ShellVariant;
  items?: { key: string; title: string; icon?: ReactNode }[];
  activeItem?: string;
  onItemClick?: (key: string) => void;
  children?: ReactNode;
}

export interface MainProps extends HTMLAttributes<HTMLElement> {
  variant?: ShellVariant;
  children?: ReactNode;
}

// =============================================================================
// Theme Types
// =============================================================================

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  /** Current theme mode */
  mode: ThemeMode;
  /** Optional accent color override */
  accentColor?: string;
}

export interface ThemeContextValue {
  /** Selected theme preference */
  theme: ThemeMode;
  /** Currently resolved theme (actual appearance) */
  resolvedTheme: 'light' | 'dark';
  /** Function to set the theme */
  setTheme: (theme: ThemeMode) => void;
}

export interface DarkModeSwitcherProps extends HTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}
