
import React, { useState, useRef, useEffect } from 'react';
import { getStrategyAdvice } from '../services/gemini';

const Coach: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const advice = await getStrategyAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: advice }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background-dark text-white pb-24">
      <header className="p-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-alt/20 flex items-center justify-center text-primary-alt">
          <span className="material-symbols-outlined">psychology</span>
        </div>
        <div>
          <h2 className="text-lg font-bold">AI Strategy Coach</h2>
          <p className="text-[10px] text-primary-alt font-bold uppercase tracking-widest">GTO Optimizer</p>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
            <div className="size-24 rounded-full bg-primary-alt/10 flex items-center justify-center border border-primary-alt/20 animate-pulse">
               <span className="material-symbols-outlined text-5xl text-primary-alt">auto_awesome</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">How can I help you today?</h3>
              <p className="text-sm text-white/50">Describe a hand, ask about GTO ranges, or get advice on table dynamics.</p>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full">
               {[
                 "Analyze AhKh in early position vs 3-bet",
                 "C-bet sizing on K-7-2 rainbow board",
                 "How to play against aggressive whales?"
               ].map((prompt, i) => (
                 <button 
                  key={i}
                  onClick={() => setQuery(prompt)}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-left hover:bg-white/10 transition-colors"
                 >
                   {prompt}
                 </button>
               ))}
            </div>
          </div>
        )}

        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-primary-alt text-white rounded-tr-none' 
                : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                <div className="size-1.5 bg-primary-alt rounded-full animate-bounce"></div>
                <div className="size-1.5 bg-primary-alt rounded-full animate-bounce [animation-delay:-.15s]"></div>
                <div className="size-1.5 bg-primary-alt rounded-full animate-bounce [animation-delay:-.3s]"></div>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10 bg-background-dark">
        <form onSubmit={handleSubmit} className="relative">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask your coach..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary-alt focus:ring-1 focus:ring-primary-alt outline-none transition-all pr-12"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary-alt disabled:opacity-50"
            disabled={!query.trim() || isLoading}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Coach;
