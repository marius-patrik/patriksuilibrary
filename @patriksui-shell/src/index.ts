// Styles
import './styles/globals.css';

// Theme
export { ThemeProvider, useTheme } from './components/theme/ThemeProvider';
export { DarkModeSwitcher } from './components/theme/DarkModeSwitcher';

// Backgrounds (renamed from BlobBackground to Wallpaper export alias)
export { BlobBackground, BlobBackground as Wallpaper } from './components/backgrounds/BlobBackground';

// Shell
import { Shell as ShellBase } from './components/shell/Shell';
import { ShellItem } from './components/shell/ShellItem';
export { ShellItem };
export const Shell = Object.assign(ShellBase, { Item: ShellItem });
export { Header } from './components/shell/Header';
export { Footer } from './components/shell/Footer';
export { Main } from './components/shell/Main';

// Desktop
export { Desktop } from './components/desktop/Desktop';
export { Window } from './components/desktop/Window';
export { Dock } from './components/desktop/Dock';
export { DesktopIcon } from './components/desktop/DesktopIcon';
export { PopupSearch } from './components/desktop/PopupSearch';
export { ControlPanel } from './components/desktop/ControlPanel';
export { WindowManagerProvider, useWindowManager, useAppRegistry } from './components/desktop/WindowManager';

// Apps
export { App } from './components/app/App';
export { SettingsApp } from './components/desktop/Settings/SettingsApp';
export * from './components/docs/Docs';

// Utilities
export { cn } from './lib/utils';

// Re-export all types from @patriksui/shell-types
export * from '@patriksui/shell-types';
export * from './components/desktop/Search';
