import { useState, useCallback } from 'react';
import { Chat, Message, Model, AVAILABLE_MODELS } from '@/types/chat';
import { mockChats } from '@/data/mockChats';
import { ChatSidebar, SidebarToggle } from './ChatSidebar';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useTheme } from '@/hooks/useTheme';

// Mock AI responses
const mockResponses = [
  "That's a great question! Let me explain...\n\nHere's a comprehensive overview:\n\n1. **First point**: Understanding the basics is crucial\n2. **Second point**: Practice makes perfect\n3. **Third point**: Don't hesitate to ask questions\n\n```javascript\n// Here's an example\nconst example = () => {\n  console.log('Hello, World!');\n};\n```\n\nFeel free to ask if you need more clarification!",
  "I'd be happy to help with that!\n\nHere's what you need to know:\n\n- The concept is relatively straightforward\n- There are multiple approaches you can take\n- Each has its own advantages\n\n> Pro tip: Start with the simplest solution and iterate from there.\n\nWould you like me to elaborate on any specific aspect?",
  "Excellent question! Here's my detailed response:\n\n## Overview\n\nThis is a fascinating topic that touches on several key areas:\n\n1. Core concepts\n2. Practical applications\n3. Best practices\n\n```python\ndef example_function(param):\n    \"\"\"A simple example\"\"\"\n    return f\"Result: {param}\"\n```\n\nLet me know if you'd like to dive deeper into any of these areas!",
];

export function ChatLayout() {
  const { theme, toggleTheme } = useTheme();
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [currentChatId, setCurrentChatId] = useState<string | null>('1');
  const [selectedModel, setSelectedModel] = useState<Model>(AVAILABLE_MODELS[0]);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentChat = chats.find((c) => c.id === currentChatId);

  const handleNewChat = useCallback(() => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setSidebarOpen(false);
  }, []);

  const handleSendMessage = useCallback((content: string) => {
    if (!currentChatId) return;

    const userMessage: Message = {
      id: `${currentChatId}-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              title: chat.messages.length === 0 ? content.slice(0, 40) + (content.length > 40 ? '...' : '') : chat.title,
              updatedAt: new Date(),
            }
          : chat
      )
    );

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: `${currentChatId}-${Date.now()}-ai`,
        role: 'assistant',
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date(),
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [...chat.messages, aiMessage],
                updatedAt: new Date(),
              }
            : chat
        )
      );
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  }, [currentChatId]);

  const handleRegenerate = useCallback(() => {
    if (!currentChatId || !currentChat) return;
    
    // Remove last AI message and regenerate
    const messages = currentChat.messages;
    if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: messages.slice(0, -1) }
            : chat
        )
      );
      
      setIsTyping(true);
      setTimeout(() => {
        const aiMessage: Message = {
          id: `${currentChatId}-${Date.now()}-ai`,
          role: 'assistant',
          content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
          timestamp: new Date(),
        };

        setChats((prev) =>
          prev.map((chat) =>
            chat.id === currentChatId
              ? {
                  ...chat,
                  messages: [...chat.messages, aiMessage],
                  updatedAt: new Date(),
                }
              : chat
          )
        );
        setIsTyping(false);
      }, 1500);
    }
  }, [currentChatId, currentChat]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={setCurrentChatId}
        onNewChat={handleNewChat}
        theme={theme}
        onToggleTheme={toggleTheme}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <SidebarToggle onClick={() => setSidebarOpen(true)} />
      
      {/* Main chat area */}
      <main className="flex-1 flex flex-col min-w-0 h-full">
        <ChatHeader
          title={currentChat?.title || 'New Conversation'}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
        
        <MessageList
          messages={currentChat?.messages || []}
          isTyping={isTyping}
          onSuggestionClick={handleSendMessage}
          onRegenerate={handleRegenerate}
        />
        
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </main>
    </div>
  );
}
