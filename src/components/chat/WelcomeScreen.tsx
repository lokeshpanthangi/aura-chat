import { motion } from 'framer-motion';
import { SUGGESTION_PROMPTS } from '@/types/chat';
import { Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onSuggestionClick: (prompt: string) => void;
}

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full px-4 py-12"
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-8">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-3 text-center">
        How can I help you today?
      </h1>
      
      <p className="text-muted-foreground text-center mb-10 max-w-md">
        Start a conversation or try one of these suggestions
      </p>
      
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
        {SUGGESTION_PROMPTS.map((prompt, index) => (
          <motion.button
            key={prompt}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => onSuggestionClick(prompt)}
            className="px-4 py-2.5 rounded-full border border-border bg-card hover:bg-muted text-sm text-foreground transition-all duration-200 hover:border-primary/50 hover:shadow-sm"
          >
            {prompt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
