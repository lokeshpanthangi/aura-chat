import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const hasContent = value.trim().length > 0;

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-lg p-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end gap-2 bg-muted rounded-2xl border border-border focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-200">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 text-muted-foreground hover:text-foreground flex-shrink-0 ml-1"
            aria-label="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent py-3 px-1 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none text-sm md:text-base min-h-[44px] max-h-[200px]"
            aria-label="Message input"
          />
          
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 text-muted-foreground hover:text-foreground flex-shrink-0"
            aria-label="Voice input"
          >
            <Mic className="w-5 h-5" />
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={!hasContent || disabled}
            size="sm"
            className={cn(
              'h-10 w-10 p-0 rounded-xl mr-1 flex-shrink-0 transition-all duration-200',
              hasContent
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted-foreground/20 text-muted-foreground cursor-not-allowed'
            )}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-3">
          AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}
