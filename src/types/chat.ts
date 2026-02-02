export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Model {
  id: string;
  name: string;
  description: string;
}

export const AVAILABLE_MODELS: Model[] = [
  { id: 'gpt-4o', name: 'GPT-4o', description: 'Most capable model' },
  { id: 'claude-3.5', name: 'Claude 3.5 Sonnet', description: 'Fast & intelligent' },
  { id: 'grok-2', name: 'Grok-2', description: 'Real-time knowledge' },
  { id: 'gemini-pro', name: 'Gemini Pro', description: 'Google\'s best' },
];

export const SUGGESTION_PROMPTS = [
  'Explain quantum computing in simple terms',
  'Write a Python function to sort a list',
  'Help me plan a trip to Hyderabad',
  'Brainstorm startup ideas for 2024',
];
