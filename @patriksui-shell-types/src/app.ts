import { ComponentType, ReactNode } from 'react';
import { WindowSize } from './window';

export interface AppConfig {
  id: string;
  name: string;
  icon: ReactNode;
  component?: ComponentType; // component is optional in config if handled externally, or required?
  defaultSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  resizable?: boolean;
}

export type CreateAppConfig = AppConfig & { component: ComponentType };

export interface AppProps extends AppConfig {
  children?: ReactNode;
}
