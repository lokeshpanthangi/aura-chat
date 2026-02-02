import { Share2, Trash2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AVAILABLE_MODELS, Model } from '@/types/chat';

interface ChatHeaderProps {
  title: string;
  selectedModel: Model;
  onModelChange: (model: Model) => void;
  onShare?: () => void;
  onDelete?: () => void;
}

export function ChatHeader({
  title,
  selectedModel,
  onModelChange,
  onShare,
  onDelete,
}: ChatHeaderProps) {
  return (
    <div className="h-14 border-b border-border bg-background/80 backdrop-blur-lg flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-4 min-w-0">
        <h1 className="text-sm font-medium text-foreground truncate max-w-[200px] md:max-w-none">
          {title}
        </h1>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground hover:text-foreground">
              <span className="text-xs">{selectedModel.name}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {AVAILABLE_MODELS.map((model) => (
              <DropdownMenuItem
                key={model.id}
                onClick={() => onModelChange(model)}
                className="flex flex-col items-start py-2"
              >
                <span className="font-medium">{model.name}</span>
                <span className="text-xs text-muted-foreground">{model.description}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onShare}
          aria-label="Share chat"
        >
          <Share2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          onClick={onDelete}
          aria-label="Delete chat"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
