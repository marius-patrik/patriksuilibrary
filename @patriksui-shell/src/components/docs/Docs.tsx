'use client';

import { useState } from 'react';
import { Shell } from '../shell/Shell';
import { ShellItem } from '../shell/ShellItem';
import { Box, Code, Layout, Type } from 'lucide-react';
import { cn } from '../../lib/utils';

// Mock data until dynamic extraction is verified/supported
const DOCS_DATA = {
  intro: {
    title: 'Introduction',
    content: (
       <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">PatrikSUI</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A premium, liquid-glass aesthetic component library for React.
            Featuring a polymorphic Shell architecture that adapts to any layout.
          </p>
       </div>
    )
  },
  components: [
    {
      name: 'Shell',
      description: 'Main Shell component that provides the application structure. Supports different variants (desktop, app, window, page, sidebar) to adapt to different use cases. Handles routing via ShellItem children and dynamic title display.',
      props: [
        { name: 'variant', type: 'ShellVariant', description: 'Layout variant (desktop, app, window, page, sidebar)' },
        { name: 'title', type: 'string', description: 'Title shown in headers/sidebars' },
        { name: 'wallpaper', type: 'ReactNode', description: 'Background component' }
      ]
    },
    {
      name: 'Window',
      description: 'Draggable, resizable window component with macOS-style controls and liquid glass effect.',
      props: [
        { name: 'title', type: 'string', description: 'Window title' },
        { name: 'isActive', type: 'boolean', description: 'Focus state' },
        { name: 'onClose', type: '() => void', description: 'Close handler' }
      ]
    },
     {
      name: 'Dock',
      description: 'macOS-style Dock with magnification effect and pinned apps.',
      props: [
        { name: 'items', type: 'DockItem[]', description: 'List of dock items' },
        { name: 'magnification', type: 'boolean', description: 'Enable hover magnification' }
      ]
    }
  ]
};

export function Docs() {
  const [activeItem, setActiveItem] = useState('Introduction');

  return (
    <Shell 
      variant="sidebar" 
      title="Documentation" 
      activeItem={activeItem}
      onItemChange={setActiveItem}
      className="bg-background"
    >
       <ShellItem title="Introduction" variant="sidebar" icon={<Box className="w-4 h-4" />}>
          <div className="p-10 max-w-4xl mx-auto animate-in fade-in duration-500">
             {DOCS_DATA.intro.content}
          </div>
       </ShellItem>

       <ShellItem title="Components" variant="sidebar" icon={<Layout className="w-4 h-4" />}>
           <div className="p-10 max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 slide-in-from-bottom-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Components</h1>
                <p className="text-muted-foreground">Detailed documentation for library components.</p>
              </div>

              <div className="grid gap-8">
                {DOCS_DATA.components.map(comp => (
                  <div key={comp.name} className="group relative rounded-2xl border border-border/50 bg-background/50 p-6 shadow-sm transition-all hover:shadow-md hover:bg-accent/5 backdrop-blur-sm">
                     <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     
                     <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold tracking-tight">{comp.name}</h2>
                        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">@patriksui-shell</span>
                     </div>
                     
                     <p className="text-muted-foreground leading-relaxed mb-6">{comp.description}</p>
                     
                     {comp.props.length > 0 && (
                       <div className="space-y-3">
                          <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground/70">Props</h3>
                          <div className="grid gap-2">
                             {comp.props.map(prop => (
                               <div key={prop.name} className="grid grid-cols-[120px_1fr] items-baseline gap-4 text-sm p-2 rounded hover:bg-muted/50 transition-colors">
                                  <div className="font-mono text-primary font-semibold">{prop.name}</div>
                                  <div className="flex flex-col gap-1">
                                     <span className="font-mono text-xs text-muted-foreground opacity-70">{prop.type}</span>
                                     <span className="text-muted-foreground">{prop.description}</span>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                     )}
                  </div>
                ))}
              </div>
           </div>
       </ShellItem>

       <ShellItem title="Types" variant="sidebar" icon={<Type className="w-4 h-4" />}>
            <div className="p-10 max-w-4xl mx-auto">
               <h1 className="text-3xl font-bold mb-6">Type Definitions</h1>
               <div className="rounded-xl border border-border bg-muted/30 p-6">
                  <p className="text-muted-foreground italic">
                     Type documentation is automatically inferred from the codebase.
                     (Implemented via manually synced JSDoc data in this version).
                  </p>
               </div>
            </div>
       </ShellItem>
    </Shell>
  );
}
