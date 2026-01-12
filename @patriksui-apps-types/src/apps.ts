import type { ReactNode } from 'react';

export interface AppProps {
  id: string;
  title: string;
  icon?: ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
}
