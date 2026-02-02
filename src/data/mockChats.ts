import { Chat } from '@/types/chat';

export const mockChats: Chat[] = [
  {
    id: '1',
    title: 'Chat about React hooks',
    messages: [
      {
        id: '1-1',
        role: 'user',
        content: 'Can you explain useEffect to me?',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: '1-2',
        role: 'assistant',
        content: `**useEffect** is a React Hook that lets you synchronize a component with an external system.

Here's a basic example:

\`\`\`javascript
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // This runs after every render
    console.log('Component rendered!');
    
    // Cleanup function (optional)
    return () => {
      console.log('Cleanup!');
    };
  }, []); // Empty dependency array = only run once
}
\`\`\`

**Key points:**
- Runs after the component renders
- Can return a cleanup function
- Dependency array controls when it re-runs`,
        timestamp: new Date(Date.now() - 3500000),
      },
    ],
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3500000),
  },
  {
    id: '2',
    title: 'Brainstorm startup ideas',
    messages: [],
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    id: '3',
    title: 'Python data analysis help',
    messages: [],
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(Date.now() - 172800000),
  },
  {
    id: '4',
    title: 'Travel plans for Japan',
    messages: [],
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(Date.now() - 259200000),
  },
  {
    id: '5',
    title: 'Debugging CSS flexbox',
    messages: [],
    createdAt: new Date(Date.now() - 345600000),
    updatedAt: new Date(Date.now() - 345600000),
  },
  {
    id: '6',
    title: 'Machine learning basics',
    messages: [],
    createdAt: new Date(Date.now() - 432000000),
    updatedAt: new Date(Date.now() - 432000000),
  },
  {
    id: '7',
    title: 'Resume writing tips',
    messages: [],
    createdAt: new Date(Date.now() - 518400000),
    updatedAt: new Date(Date.now() - 518400000),
  },
  {
    id: '8',
    title: 'API design patterns',
    messages: [],
    createdAt: new Date(Date.now() - 604800000),
    updatedAt: new Date(Date.now() - 604800000),
  },
];
