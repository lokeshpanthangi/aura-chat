import { useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { WelcomeScreen } from './WelcomeScreen';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onSuggestionClick: (prompt: string) => void;
  onRegenerate?: () => void;
}

export function MessageList({ messages, isTyping, onSuggestionClick, onRegenerate }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return <WelcomeScreen onSuggestionClick={onSuggestionClick} />;
  }

  return (
    <ScrollArea className="flex-1 h-full" ref={scrollRef}>
      <div className="max-w-3xl mx-auto px-4 py-6 chat-scrollbar">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            onRegenerate={
              message.role === 'assistant' && index === messages.length - 1
                ? onRegenerate
                : undefined
            }
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
    </ScrollArea>
  );
}
