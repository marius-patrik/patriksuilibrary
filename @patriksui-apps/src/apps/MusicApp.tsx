import { Music, Play, SkipBack, SkipForward, Disc, Volume2, ListMusic } from 'lucide-react';

export function MusicApp() {
  return (
    <div className="flex h-full w-full bg-background/50 backdrop-blur-3xl overflow-hidden text-foreground">
       {/* Sidebar */}
       <div className="w-56 bg-black/10 dark:bg-black/40 border-r border-white/10 flex flex-col p-4 gap-6">
          <div className="flex items-center gap-3 text-pink-500 mb-2">
             <Music className="w-6 h-6" />
             <h2 className="font-bold tracking-tight">Music</h2>
          </div>
          
          <div className="space-y-1">
             <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-2">Library</div>
             {['Listen Now', 'Browse', 'Radio'].map(item => (
                <button key={item} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                   {item}
                </button>
             ))}
          </div>

          <div className="space-y-1">
             <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-2">Playlists</div>
             {['Chill Mix', 'Top Hits', 'Workout'].map(item => (
                <button key={item} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors flex items-center gap-2">
                   <ListMusic className="w-4 h-4 opacity-50" />
                   {item}
                </button>
             ))}
          </div>
       </div>

       {/* Main Player */}
       <div className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-pink-500/10 via-background to-background">
          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8 p-12">
             <div className="w-64 h-64 rounded-2xl shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-2xl animate-pulse opacity-20 blur-xl group-hover:blur-2xl transition-all" />
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-violet-600 rounded-2xl border border-white/20 flex items-center justify-center">
                   <Disc className="w-32 h-32 text-white/80 animate-spin-slow" />
                </div>
             </div>
             
             <div className="text-center space-y-1">
                <h1 className="text-2xl font-bold">Midnight City</h1>
                <p className="text-muted-foreground font-medium">M83 • Hurry Up, We're Dreaming</p>
             </div>
             
             {/* Controls */}
             <div className="flex flex-col items-center gap-6 w-full max-w-md">
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                   <div className="w-1/3 h-full bg-pink-500 rounded-full" />
                </div>
                
                <div className="flex items-center gap-8">
                   <button className="text-muted-foreground hover:text-foreground transition-colors"><SkipBack className="w-8 h-8" /></button>
                   <button className="w-16 h-16 rounded-full bg-pink-500 text-white shadow-lg shadow-pink-500/30 flex items-center justify-center hover:scale-105 transition-transform">
                      <Play className="w-8 h-8 ml-1 fill-current" />
                   </button>
                   <button className="text-muted-foreground hover:text-foreground transition-colors"><SkipForward className="w-8 h-8" /></button>
                </div>
             </div>
          </div>
          
          {/* Top Bar */}
          <div className="absolute top-0 right-0 p-4 flex gap-4">
             <Volume2 className="w-5 h-5 text-muted-foreground" />
             <div className="w-24 h-1 bg-white/10 rounded-full mt-2">
                <div className="w-2/3 h-full bg-muted-foreground rounded-full" />
             </div>
          </div>
       </div>
    </div>
  );
}
