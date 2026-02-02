import { ChatMode } from '@/types/chat';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Zap, Settings, ChevronDown, User } from 'lucide-react';

interface ModeSwitcherProps {
  mode: ChatMode;
  employeeId?: string;
  onModeChange: (mode: ChatMode) => void;
}

export function ModeSwitcher({ mode, employeeId, onModeChange }: ModeSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 h-8">
          {mode === 'full' ? (
            <>
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs">Full Mode</span>
            </>
          ) : (
            <>
              <Settings className="h-3.5 w-3.5 text-secondary-foreground" />
              <span className="text-xs">Manual Mode</span>
            </>
          )}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => onModeChange('full')}
          className="gap-2"
        >
          <Zap className="h-4 w-4 text-primary" />
          <span>Full Mode</span>
          {mode === 'full' && <span className="ml-auto text-xs text-primary">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onModeChange('manual')}
          className="gap-2"
        >
          <Settings className="h-4 w-4" />
          <span>Manual Mode</span>
          {mode === 'manual' && <span className="ml-auto text-xs text-primary">✓</span>}
        </DropdownMenuItem>
        {mode === 'manual' && employeeId && (
          <div className="px-2 py-1.5 text-xs text-muted-foreground border-t mt-1 pt-2 flex items-center gap-1.5">
            <User className="h-3 w-3" />
            <span>ID: {employeeId}</span>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
