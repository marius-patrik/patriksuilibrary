'use client';

import type { ShellItemProps } from '@patriksui/shell-types';

/**
 * ShellItem component for defining routes/pages within a Shell.
 * Does not render directly - Shell reads its props to build navigation.
 */
export function ShellItem({ children }: ShellItemProps) {
  return <>{children}</>;
}

ShellItem.displayName = 'ShellItem';
