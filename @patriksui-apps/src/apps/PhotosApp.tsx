import { Image as ImageIcon, Heart, Share2, ZoomIn, Grid } from 'lucide-react';

export function PhotosApp() {
  return (
    <div className="flex h-full w-full bg-background/50 backdrop-blur-3xl overflow-hidden">
       {/* Sidebar */}
       <div className="w-48 bg-white/40 dark:bg-black/20 border-r border-white/10 flex flex-col p-3 gap-1">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2 mt-2">Library</div>
          {['All Photos', 'Days', 'Months', 'Years'].map((item, i) => (
             <button key={item} className={`text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'text-muted-foreground hover:bg-white/10'}`}>
                {item}
             </button>
          ))}
          
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2 mt-6">Albums</div>
          {['Favorites', 'Recents', 'Travel', 'Work'].map((item) => (
             <button key={item} className="text-left px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-white/10 transition-colors">
                {item}
             </button>
          ))}
       </div>

       {/* Main Grid */}
       <div className="flex-1 flex flex-col h-full bg-white/30 dark:bg-black/30">
          <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/10 backdrop-blur-xl shrink-0">
             <h2 className="text-lg font-bold">All Photos</h2>
             <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"><ZoomIn className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"><Grid className="w-4 h-4 text-muted-foreground" /></button>
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/20">
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 24 }).map((_, i) => (
                   <div key={i} className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer bg-muted/20 border border-white/10 shadow-sm">
                      {/* Placeholder Image */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:scale-110 transition-transform duration-500">
                         <ImageIcon className="w-8 h-8 text-muted-foreground/20" />
                      </div>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end justify-between p-3 opacity-0 group-hover:opacity-100">
                         <button className="p-1.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white transition-colors">
                            <Heart className="w-3.5 h-3.5" />
                         </button>
                         <button className="p-1.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white transition-colors">
                            <Share2 className="w-3.5 h-3.5" />
                         </button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}
