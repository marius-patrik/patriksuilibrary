import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@patriksui/shell';

export function CalendarApp() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date().getDate();
  
  return (
    <div className="flex flex-col h-full w-full bg-background/40 backdrop-blur-3xl overflow-hidden text-foreground">
       {/* Header */}
       <div className="h-14 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold bg-gradient-to-br from-red-500 to-orange-500 bg-clip-text text-transparent">January 2026</h2>
             <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 rounded-lg p-0.5">
                <button className="p-1 rounded-md hover:bg-white/20 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                <button className="p-1 rounded-md hover:bg-white/20 transition-colors"><ChevronRight className="w-4 h-4" /></button>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-3 py-1.5 text-xs font-medium bg-red-500 text-white rounded-md shadow-lg shadow-red-500/20 hover:bg-red-600 transition-colors">Today</button>
             <button className="p-1.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-white/20 transition-colors"><Plus className="w-4 h-4" /></button>
          </div>
       </div>

       {/* Days Header */}
       <div className="grid grid-cols-7 border-b border-white/5 py-2 shrink-0">
          {days.map(d => (
             <div key={d} className="text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{d}</div>
          ))}
       </div>

       {/* Calendar Grid */}
       <div className="flex-1 grid grid-cols-7 auto-rows-fr overflow-y-auto">
          {Array.from({ length: 35 }).map((_, i) => {
             const day = i - 2; // Offset for start of month
             const isCurrentMonth = day > 0 && day <= 31;
             const isToday = day === currentDate;
             
             return (
               <div key={i} className={cn(
                  "min-h-[80px] p-2 border-b border-r border-white/5 transition-colors relative group",
                  !isCurrentMonth && "bg-black/5 dark:bg-white/5 text-muted-foreground/30"
               )}>
                  <div className={cn(
                     "w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium mb-1 transition-all",
                     isToday ? "bg-red-500 text-white shadow-md shadow-red-500/30" : "text-muted-foreground group-hover:bg-white/10"
                  )}>
                     {day > 0 && day <= 31 ? day : (day <= 0 ? 31 + day : day - 31)}
                  </div>
                  
                  {/* Mock Events */}
                  {isCurrentMonth && (day === 12 || day === 15 || day === 24) && (
                     <div className="space-y-1">
                        <div className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/10 truncate font-medium">
                           Team Meeting
                        </div>
                        {day === 15 && (
                           <div className="px-1.5 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/10 truncate font-medium">
                              Design Review
                           </div>
                        )}
                     </div>
                  )}
               </div>
             );
          })}
       </div>
    </div>
  );
}
