'use client';

import type { ReactNode } from 'react';
import type { AppProps, WindowSize, CreateAppConfig } from '@patriksui/shell-types';

// App component is primarily a metadata wrapper
// It doesn't render anything directly - it provides config to the window manager
export function App({
  id,
  name,
  icon,
  children,
  defaultSize,
  minSize,
  resizable = true,
}: AppProps) {
  // This component is used for registration
  // The actual rendering happens in windows
  return null;
}

export function createApp(config: CreateAppConfig) {
  return config;
}

App.displayName = 'App';
