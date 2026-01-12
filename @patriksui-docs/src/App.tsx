'use client';

import { useState } from 'react';
import {
  Shell,
  ShellItem,
  ThemeProvider,
  DarkModeSwitcher
} from '@patriksui/shell';
import { Box, Layout, Code } from 'lucide-react';
import '@patriksui/shell/styles.css';

export default function App() {
  const [activeDoc, setActiveDoc] = useState('Introduction');

  return (
    <ThemeProvider>
      <div className="h-screen w-full overflow-hidden">
          <Shell 
            variant="sidebar" 
            title="PatrikSUI Docs"
            activeItem={activeDoc}
            onItemChange={setActiveDoc}
            headerContent={<div className="ml-auto flex items-center gap-2"><DarkModeSwitcher /></div>}
            footerContent={<div className="text-center py-4 text-xs text-muted-foreground border-t border-border/50">© 2024 PatrikSUI Library</div>}
          >
             {/* Documentation Routes */}
             <ShellItem title="Introduction" variant="sidebar" icon={<Box className="w-4 h-4" />}>
                <div className="p-8 max-w-3xl mx-auto space-y-6">
                   <h1 className="text-4xl font-bold tracking-tight">Introduction</h1>
                   <p className="text-lg text-muted-foreground leading-relaxed">
                     PatrikSUI is a modern, liquid-glass aesthetic component library built for React.
                     It features a powerful Shell architecture that adapts to Desktop, App, and Web layouts.
                   </p>
                   <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                      <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                      <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Liquid Glass Esthetics</li>
                        <li>Polymorphic Shell Component</li>
                        <li>Desktop Environment Simulation</li>
                        <li>Strict Type Safety</li>
                      </ul>
                   </div>
                </div>
             </ShellItem>

             <ShellItem title="Components" variant="sidebar" icon={<Layout className="w-4 h-4" />}>
                <div className="p-8 max-w-3xl mx-auto">
                   <h1 className="text-3xl font-bold mb-6">Components</h1>
                   <div className="grid grid-cols-2 gap-6">
                      {['Shell', 'Window', 'Dock', 'ControlPanel'].map(c => (
                        <div key={c} className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card/80 transition-colors">
                           <h3 className="font-semibold mb-2">{c}</h3>
                           <p className="text-sm text-muted-foreground">Detailed documentation for {c} component.</p>
                        </div>
                      ))}
                   </div>
                </div>
             </ShellItem>

             <ShellItem title="Types" variant="sidebar" icon={<Code className="w-4 h-4" />}>
                <div className="p-8 max-w-3xl mx-auto">
                   <h1 className="text-3xl font-bold mb-4">Type Definitions</h1>
                   <div className="prose dark:prose-invert">
                      <p>All types are strictly separated into <code>@patriksui/shell-types</code> and <code>@patriksui/apps-types</code>.</p>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-4">
{`// Shell Props
interface ShellProps {
  variant: 'desktop' | 'app' | 'window' | 'page' | 'sidebar';
  title?: string;
  items?: ShellItem[];
}
`}
                      </pre>
                   </div>
                </div>
             </ShellItem>
          </Shell>
      </div>
    </ThemeProvider>
  );
}
