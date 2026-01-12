import { useState, useEffect } from 'react';
import '@patriksui/shell/styles.css';
import {
  Shell,
  ShellItem,
  ThemeProvider,
  Wallpaper,
  DesktopIcon,
  PopupSearch,
  WindowManagerProvider,
  useWindowManager,
  SettingsApp,
  Window,
  Dock,
  ControlPanel,
  Docs
} from '@patriksui/shell';
import { NotesApp, CalendarApp, PhotosApp, MusicApp } from '@patriksui/apps';
import type { ShellVariant, DockItem } from '@patriksui/shell-types';
import { FileText, Calendar, Image, Music as MusicIcon, Settings } from 'lucide-react';

// Built-in apps configuration
const builtInApps = [
  { id: 'settings', name: 'Settings', icon: <Settings className="w-full h-full text-gray-500" />, component: SettingsApp },
  { id: 'notes', name: 'Notes', icon: <FileText className="w-full h-full text-yellow-500" />, component: NotesApp },
  { id: 'calendar', name: 'Calendar', icon: <Calendar className="w-full h-full text-red-500" />, component: CalendarApp },
  { id: 'photos', name: 'Photos', icon: <Image className="w-full h-full text-blue-500" />, component: PhotosApp },
  { id: 'music', name: 'Music', icon: <MusicIcon className="w-full h-full text-pink-500" />, component: MusicApp },
];

export default function App() {
  const [variant, setVariant] = useState<ShellVariant>('router');

  // Variant Selector Component
  const VariantSelector = () => (
    <div className="flex gap-4 p-8 bg-card rounded-3xl shadow-2xl border border-border">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Select Experience</h2>
        <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'desktop', label: 'Desktop OS', icon: '🖥️' },
              { id: 'sidebar', label: 'Documentation', icon: '📚' },
              { id: 'app', label: 'Mobile App', icon: '📱' },
              { id: 'window', label: 'Window', icon: '🪟' },
              { id: 'page', label: 'Web Page', icon: '📄' }
            ].map(v => (
              <button
                key={v.id}
                onClick={() => setVariant(v.id as ShellVariant)}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-all hover:scale-105 active:scale-95 text-center w-32 h-32 justify-center"
              >
                <div className="text-4xl">{v.icon}</div>
                <span className="text-sm font-medium">{v.label}</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );

  // Return to Selector Button
  const BackButton = () => (
     <button 
        onClick={() => setVariant('router')}
        className="fixed bottom-4 left-4 z-[9999] p-2 rounded-full bg-background/50 backdrop-blur-xl border border-border/50 shadow-xl hover:bg-background transition-colors text-xs font-bold"
     >
       ↩ Back
     </button>
  );

  // Control Center State
  const [isControlCenterOpen, setControlCenterOpen] = useState(false);

  // Header Content with Status Bar
  const DesktopHeader = () => (
    <div className="flex items-center gap-4 px-2">
      <div className="flex items-center gap-3">
        {/* Status Icons */}
        <div className="flex items-center gap-2 px-2 py-1 bg-background/20 rounded-md">
           <span className="text-xs font-medium">Jan 11 23:51</span>
        </div>
      </div>

      {/* Control Center Toggle */}
      <div className="relative">
        <button 
          onClick={() => setControlCenterOpen(!isControlCenterOpen)}
          className={`p-1.5 rounded-md transition-colors ${isControlCenterOpen ? 'bg-background/40' : 'hover:bg-background/20'}`}
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Control Center Dropdown */}
        {isControlCenterOpen && (
          <>
            <div 
               className="fixed inset-0 z-40" 
               onClick={() => setControlCenterOpen(false)} 
            />
            <div className="absolute top-10 right-0 z-50 w-80 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              <ControlPanel className="shadow-2xl border-border/40" />
            </div>
          </>
        )}
      </div>
    </div>
  );

  if (variant === 'router') {
    return (
      <ThemeProvider>
        <div className="h-screen w-full bg-gradient-to-br from-background to-muted">
           <Shell variant="router" footerContent={<div className="p-4 text-center opacity-50 text-xs"> PatriksUI Playground </div>}>
              <VariantSelector />
           </Shell>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="h-screen w-full overflow-hidden">
        <BackButton />
        {variant === 'desktop' && (
          <Shell 
            variant="desktop" 
            title="PatrikSUI OS"
            apps={builtInApps} // Pass apps directly!
            // No footer content for Control Panel anymore
            headerContent={<DesktopHeader />}
          />
        )}

        {variant === 'sidebar' && <Docs />}
        
        {variant === 'app' && (
             <Shell variant="app" title="Mobile Example" headerContent={<div>Time</div>} footerContent={<div>Tab Bar</div>}>
                <div className="p-4">App Content</div>
             </Shell>
        )}

        {variant === 'window' && (
             <div className="p-20 bg-muted/20 h-full flex items-center justify-center">
                 <div className="w-[600px] h-[400px]">
                    <Shell variant="window" title="Standalone Window">
                        <div className="p-4">Window Content</div>
                    </Shell>
                 </div>
             </div>
        )}

        {variant === 'page' && (
             <Shell variant="page" title="Web Page Example" headerContent={<div>Nav</div>} footerContent={<div>Footer</div>}>
                <div className="p-20 max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Web Page Content</h1>
                    <p>Standard website layout content.</p>
                </div>
             </Shell>
        )}
      </div>
    </ThemeProvider>
  );
}
