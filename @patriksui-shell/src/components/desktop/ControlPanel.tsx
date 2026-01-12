'use client';

import { useState } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Bluetooth, 
  BluetoothOff, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX,
  Monitor,
  Calculator,
  Clock,
  Camera
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface ControlPanelProps {
  className?: string;
}

export function ControlPanel({ className }: ControlPanelProps) {
  const [wifiEnabled, setWifiEnabled] = useState(false);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [brightness, setBrightness] = useState(75);
  const [volume, setVolume] = useState(50);

  return (
    <div
      className={cn(
        'bg-background/40 backdrop-blur-2xl rounded-3xl p-6',
        'border border-border/20 shadow-2xl',
        'w-full max-w-md',
        className
      )}
    >
      {/* Connection Toggles Row */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Wi-Fi Toggle */}
        <button
          type="button"
          onClick={() => setWifiEnabled(!wifiEnabled)}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-2xl',
            'bg-background/30 backdrop-blur-xl',
            'border border-border/20 transition-all',
            wifiEnabled ? 'bg-primary/20' : 'hover:bg-background/40'
          )}
        >
          {wifiEnabled ? (
            <Wifi className="w-5 h-5" />
          ) : (
            <WifiOff className="w-5 h-5 text-muted-foreground" />
          )}
          <div className="text-left flex-1">
            <div className="text-sm font-medium">Wi-Fi</div>
            <div className="text-xs text-muted-foreground">
              {wifiEnabled ? 'On' : 'Off'}
            </div>
          </div>
        </button>

        {/* Bluetooth Toggle */}
        <button
          type="button"
          onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-2xl',
            'bg-background/30 backdrop-blur-xl',
            'border border-border/20 transition-all',
            bluetoothEnabled ? 'bg-primary/20' : 'hover:bg-background/40'
          )}
        >
          {bluetoothEnabled ? (
            <Bluetooth className="w-5 h-5" />
          ) : (
            <BluetoothOff className="w-5 h-5 text-muted-foreground" />
          )}
          <div className="text-left flex-1">
            <div className="text-sm font-medium">Bluetooth</div>
            <div className="text-xs text-muted-foreground">
              {bluetoothEnabled ? 'On' : 'Off'}
            </div>
          </div>
        </button>
      </div>

      {/* Focus Mode */}
      <button
        type="button"
        onClick={() => setFocusMode(!focusMode)}
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-2xl w-full mb-3',
          'bg-background/30 backdrop-blur-xl',
          'border border-border/20 transition-all',
          focusMode ? 'bg-primary/20' : 'hover:bg-background/40'
        )}
      >
        <Moon className="w-5 h-5" />
        <div className="text-left flex-1">
          <div className="text-sm font-medium">Focus</div>
        </div>
      </button>

      {/* Display Brightness */}
      <div className="bg-background/30 backdrop-blur-xl rounded-2xl p-4 mb-3 border border-border/20">
        <div className="flex items-center gap-3 mb-2">
          <Sun className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Display</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
          className="w-full h-2 bg-primary/40 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary"
        />
      </div>

      {/* Sound Volume */}
      <div className="bg-background/30 backdrop-blur-xl rounded-2xl p-4 mb-3 border border-border/20">
        <div className="flex items-center gap-3 mb-2">
          {volume > 0 ? (
            <Volume2 className="w-4 h-4 text-muted-foreground" />
          ) : (
            <VolumeX className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">Sound</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full h-2 bg-primary/40 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        <button
          type="button"
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-background/30 backdrop-blur-xl border border-border/20 hover:bg-background/40 transition-all"
        >
          <Monitor className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-background/30 backdrop-blur-xl border border-border/20 hover:bg-background/40 transition-all"
        >
          <Calculator className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-background/30 backdrop-blur-xl border border-border/20 hover:bg-background/40 transition-all"
        >
          <Clock className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-background/30 backdrop-blur-xl border border-border/20 hover:bg-background/40 transition-all"
        >
          <Camera className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
