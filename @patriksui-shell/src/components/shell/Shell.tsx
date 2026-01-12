'use client';

import { forwardRef, Children, isValidElement, type ReactElement, type ReactNode } from 'react';
import type { ShellProps, ShellItemProps, ShellItemVariant } from '@patriksui/shell-types';
import { cn } from '../../lib/utils';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { ShellItem } from './ShellItem';
import { WindowManagerProvider } from '../desktop/WindowManager';
import { DesktopShellContent, DesktopDockFooter } from './DesktopContent';

// Helper to extract items from children
const getItemsFromChildren = (children: ReactNode, filterVariant?: ShellItemVariant): { key: string; title: string; icon?: ReactNode }[] => {
  const items: { key: string; title: string; icon?: ReactNode }[] = [];
  
  Children.forEach(children, (child) => {
    if (isValidElement(child) && (child.type === ShellItem || (child.type as any).displayName === 'ShellItem')) {
      const props = child.props as ShellItemProps;
      const variant = props.variant || 'page'; // Default to page
      
      // Filter logic:
      // If we ask for 'sidebar', get only sidebar items
      // If we ask for 'page', get page AND undefined items (default)
      // If we ask for 'app', get only app items
      
      const match = filterVariant === variant || (filterVariant === 'page' && !props.variant);
      
      if (match) {
        items.push({
          key: props.title, // Simple key generation
          title: props.title,
          icon: props.icon
        });
      }
    }
  });
  
  return items;
};

/**
 * Main Shell component that provides the application structure.
 * Supports different variants (desktop, app, window, page, sidebar) to adapt to different use cases.
 * Handles routing via ShellItem children and dynamic title display.
 */
export const Shell = forwardRef<HTMLDivElement, ShellProps>(
  (
    {
      variant,
      headerContent,
      footerContent,
      mainContent,
      wallpaper,
      HeaderComponent,
      FooterComponent,
      MainComponent,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const HeaderComp = HeaderComponent ?? Header;
    const FooterComp = FooterComponent ?? Footer;
    const MainComp = MainComponent ?? Main;

    // Extract navigation items
    const headerItems = getItemsFromChildren(children, 'page');
    
    // Find active header item (parent) and active content (leaf)
    let activeHeaderItem: ReactElement | null = null;
    let activeChild = mainContent;

    if (props.activeItem) {
      Children.forEach(children, (child) => {
        if (!isValidElement(child)) return;
        const childProps = child.props as any;
        
        // Check if direct match (top level page)
        if (childProps.title === props.activeItem) {
           // Only set as active header (parent) if it's a page variant (creates a sub-navigation context)
           // If it's a sidebar item, it's just a leaf in the top-level sidebar.
           if (!childProps.variant || childProps.variant === 'page') {
             activeHeaderItem = child;
           }
           
           // If it has no sidebar children, content is its children. 
           // If it HAS sidebar children, it might be a container, but if it matched directly, 
           // and provided content, usage implies showing that content.
           activeChild = childProps.children;
        } 
        
        // Check children for match (nested sidebar item)
        if (childProps.children) {
           const subItems = getItemsFromChildren(childProps.children, 'sidebar');
           if (subItems.some(item => item.title === props.activeItem)) {
              activeHeaderItem = child;
              // Find the specific grandchild content
              Children.forEach(childProps.children, (grandChild) => {
                if (isValidElement(grandChild) && (grandChild.props as any).title === props.activeItem) {
                  activeChild = ((grandChild as ReactElement).props as any).children;
                }
              });
           }
        }
      });
    }

    // Sidebar items come from the active header item's children (if found), OR top-level sidebar items
    const sidebarItems = activeHeaderItem 
      ? getItemsFromChildren(((activeHeaderItem as ReactElement).props as any).children, 'sidebar')
      : getItemsFromChildren(children, 'sidebar');
    
    // (Redundant block removed)
    if (!activeChild) {
        // If no active item specified and no mainContent, show first valid child?
        // Or let consumer handle it.
        // For now, render all children if variant expects (like app/desktop) or let Main handle it.
        // For 'page'/'sidebar', we strictly want to render the active route.
        if (variant === 'page' || variant === 'sidebar') {
             // If no active item, maybe don't render anything or render first child
             // Keeping simple: render children directly if not in routing mode, but here we are in routing mode.
             // If activeItem is undefined, we might just render children (standard react behavior) if they are not just ShellItems
             // But ShellItems are just wrappers. 
             // Logic: If children are ShellItems, render active child. If standard nodes, render them.
             
             // We'll leave children in MainComp below if no activeChild found, but usually ShellItem pattern requires activeItem state.
        }
    }

    
    const shellBaseStyles = cn(
      'relative w-full h-full min-h-screen overflow-hidden',
      variant === 'desktop' && 'bg-transparent',
      variant === 'app' && 'bg-background/80 backdrop-blur-2xl',
      variant === 'window' && 'bg-background rounded-lg shadow-2xl',
      variant === 'page' && 'bg-background',
      variant === 'sidebar' && 'bg-background',
      className
    );

    // Desktop variant
    if (variant === 'desktop') {
      return (
        <WindowManagerProvider apps={props.apps}>
          <div ref={ref} className={shellBaseStyles} {...props}>
            {wallpaper && <div className="absolute inset-0 z-0">{wallpaper}</div>}
            <div className="relative z-10 flex flex-col min-h-screen">
              <HeaderComp variant={variant} title={props.title}>
                {headerContent}
              </HeaderComp>
              <MainComp variant={variant} className="flex-1">
                {/* Desktop Content Manager (Icons, Windows) */}
                <DesktopShellContent />
                {children}
              </MainComp>
              <FooterComp variant={variant}>
                {/* Dock is rendered here */}
                {footerContent}
                <DesktopDockFooter />
              </FooterComp>
            </div>
          </div>
        </WindowManagerProvider>
      );
    }

    // Router variant (Simple container for demos)
    if (variant === 'router') {
      return (
        <div ref={ref} className={shellBaseStyles} {...props}>
          {wallpaper && <div className="absolute inset-0 z-0">{wallpaper}</div>}
          <div className="relative z-10 flex flex-col h-full">
            <MainComp variant={variant} className="flex-1 flex flex-col items-center justify-center p-8">
              {children}
            </MainComp>
            <FooterComp variant={variant} className="sticky bottom-0 z-50 bg-background/60 backdrop-blur-xl border-t border-border/50">
              {footerContent}
            </FooterComp>
          </div>
        </div>
      );
    }

    // App variant (iOS style)
    if (variant === 'app') {
      return (
        <div ref={ref} className={shellBaseStyles} {...props}>
          {wallpaper && <div className="absolute inset-0 z-0">{wallpaper}</div>}
          <div className="relative z-10 flex flex-col h-full">
            <HeaderComp variant={variant} title={props.title} className="sticky top-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
              {headerContent}
            </HeaderComp>
            <MainComp variant={variant} className="flex-1 overflow-auto">
              {mainContent}
              {children}
            </MainComp>
            <FooterComp variant={variant} className="sticky bottom-0 z-50 bg-background/60 backdrop-blur-xl border-t border-border/50">
              {footerContent}
            </FooterComp>
          </div>
        </div>
      );
    }

    // Window variant
    if (variant === 'window') {
      return (
        <div ref={ref} className={shellBaseStyles} {...props}>
          <HeaderComp variant={variant} title={props.title}>
            {headerContent}
          </HeaderComp>
          <MainComp variant={variant} className="flex-1 overflow-auto">
            {mainContent}
            {children}
          </MainComp>
          {footerContent && (
            <FooterComp variant={variant}>
              {footerContent}
            </FooterComp>
          )}
        </div>
      );
    }

    // Sidebar variant
    if (variant === 'sidebar') {
      return (
        <div ref={ref} className={shellBaseStyles} {...props}>
          {wallpaper && <div className="absolute inset-0 z-0">{wallpaper}</div>}
          <div className="relative z-10 flex flex-col h-full">
            <HeaderComp variant={variant} title={props.title} className="sticky top-0 z-50 bg-background border-b border-border">
              {headerContent}
            </HeaderComp>
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar navigation */}
              <aside className="w-64 border-r border-border bg-muted/30 overflow-y-auto p-4 flex flex-col gap-1">
                 <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-2">Menu</div>
                 
                 {/* Render Sidebar Items */}
                 <nav className="flex flex-col gap-1">
                    {sidebarItems.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => props.onItemChange?.(item.key)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                          'hover:bg-accent hover:text-accent-foreground',
                          props.activeItem === item.key ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                        )}
                      >
                        {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                        {item.title}
                      </button>
                    ))}
                 </nav>
              </aside>
              <MainComp variant={variant} className="flex-1 overflow-auto">
                {activeChild || children}
              </MainComp>
            </div>
            <FooterComp variant={variant}>
              {footerContent}
            </FooterComp>
          </div>
        </div>
      );
    }

    // Page variant (default)
    return (
      <div ref={ref} className={shellBaseStyles} {...props}>
        {wallpaper && <div className="absolute inset-0 z-0">{wallpaper}</div>}
        <div className="relative z-10 flex flex-col min-h-full">
          <HeaderComp 
            variant={variant} 
            title={props.title} 
            items={headerItems}
            activeItem={activeHeaderItem ? (activeHeaderItem as ReactElement).props.title : props.activeItem}
            onItemClick={props.onItemChange}
            className="sticky top-0 z-50 bg-background border-b border-border"
          >
            {headerContent}
          </HeaderComp>
          <MainComp variant={variant} className="flex-1">
            {activeChild || children}
          </MainComp>
          <FooterComp variant={variant}>
            {footerContent}
          </FooterComp>
        </div>
      </div>
    );
  }
);

Shell.displayName = 'Shell';
