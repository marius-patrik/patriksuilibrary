import { FileText, Plus, Trash2, Search } from 'lucide-react';

export function NotesApp() {
  return (
    <div className="flex h-full w-full bg-background/50 backdrop-blur-3xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 dark:border-white/5 bg-white/40 dark:bg-black/20 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 border-b border-white/10 flex items-center px-3 gap-2">
            <div className="relative flex-1">
               <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
               <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full text-xs pl-8 pr-2 py-1.5 rounded-md bg-black/5 dark:bg-white/5 border-none outline-none focus:ring-1 ring-primary/50 transition-all placeholder:text-muted-foreground/70"
               />
            </div>
        </div>
        
        {/* List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
           {/* Mock Items */}
           {[1, 2, 3].map(i => (
              <div key={i} className={`p-3 rounded-lg cursor-default transition-all group ${i === 1 ? 'bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20' : 'hover:bg-white/40 dark:hover:bg-white/5'}`}>
                 <h4 className="text-sm font-semibold mb-1 line-clamp-1">Project Idea: Shell Architecture</h4>
                 <p className={`text-xs line-clamp-2 ${i === 1 ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    Refactor the entire component library to support polymorphic variants...
                 </p>
                 <div className={`mt-2 text-[10px] ${i === 1 ? 'text-primary-foreground/60' : 'text-muted-foreground/60'}`}>10:4{i} AM</div>
              </div>
           ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white/30 dark:bg-black/30">
          <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-white/20 dark:bg-white/5 backdrop-blur-md">
             <div className="text-xs text-muted-foreground">Last edited just now</div>
             <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                   <Plus className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 rounded-md hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors">
                   <Trash2 className="w-4 h-4" />
                </button>
             </div>
          </div>
          <div className="flex-1 p-8 overflow-y-auto">
             <h1 className="text-3xl font-bold mb-4 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">Project Idea: Shell Architecture</h1>
             <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>We need to refactor the library to support multiple variants for the Shell component.</p>
                <ul className="list-disc pl-4 space-y-2 mt-4">
                   <li>Desktop Variant (macOS style)</li>
                   <li>App Variant (iOS style)</li>
                   <li>Window Variant</li>
                   <li>Page Variant</li>
                </ul>
             </div>
          </div>
      </div>
    </div>
  );
}
