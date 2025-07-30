'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Interview, Message } from '@/lib/types';
import { Bot, User, CornerDownLeft, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { handleUserResponse } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialQuestion = "Hello, I'm your AI interviewer from Axel AI. I'm here to help you practice for your upcoming interview. To start, can you please tell me a bit about yourself and your experience?";

export function InterviewClient({ interview }: { interview: Interview }) {
  const router = useRouter();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: initialQuestion, question: initialQuestion },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const lastAssistantMessage = messages.filter(m => m.role === 'assistant').slice(-1)[0];
      const conversationHistory = messages.map(m => ({
        question: m.question || '',
        answer: m.role === 'user' ? m.content : ''
      })).filter(h => h.question && h.answer);

      const res = await handleUserResponse({
        jobDescription: interview.jobDescription,
        candidateResume: interview.candidateResume,
        candidateResponse: input,
        currentQuestion: lastAssistantMessage?.question,
        conversationHistory: conversationHistory
      });

      if (res.success && res.data) {
        const { nextQuestion, feedback, isInterviewFinished } = res.data;
        
        setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if(lastMessage.role === 'user') {
                lastMessage.feedback = feedback;
            }
            return newMessages;
        });

        if (isInterviewFinished) {
          toast({
            title: "Interview Complete!",
            description: "Generating your feedback report...",
          });
          // Ideally, here you'd save the full transcript before redirecting.
          // For now, we'll pass it in state if possible, or refetch on the feedback page.
          router.push(`/interview/${interview.id}/feedback`);
        } else {
          const assistantMessage: Message = { role: 'assistant', content: nextQuestion, question: nextQuestion };
          setMessages((prev) => [...prev, assistantMessage]);
        }
      } else {
        throw new Error(res.error || "An unknown error occurred.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
      });
      setMessages((prev) => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
       <div className="mb-4">
          <h1 className="font-headline text-3xl font-bold">Interview for {interview.role}</h1>
          <p className="text-muted-foreground">Company: {interview.company}</p>
        </div>
      <Card className="flex-grow flex flex-col">
        <CardContent className="flex-grow p-0 flex flex-col">
          <ScrollArea className="flex-grow p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div key={index} className={cn('flex items-start gap-4', message.role === 'user' ? 'justify-end' : '')}>
                  {message.role === 'assistant' && (
                    <Avatar className="bg-primary/20 text-primary">
                      <AvatarFallback><Bot size={20} /></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("max-w-xl space-y-2", message.role === 'user' ? 'text-right' : '')}>
                    <div className={cn('rounded-lg p-4', message.role === 'assistant' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === 'user' && message.feedback && (
                        <Alert className="text-left">
                          <Sparkles className="h-4 w-4" />
                          <AlertTitle className="font-semibold">Feedback</AlertTitle>
                          <AlertDescription className="text-xs">{message.feedback}</AlertDescription>
                        </Alert>
                    )}
                  </div>
                   {message.role === 'user' && (
                    <Avatar className="bg-secondary">
                      <AvatarFallback><User size={20} /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-4">
                    <Avatar className="bg-primary/20 text-primary">
                      <AvatarFallback><Bot size={20} /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-4 bg-muted flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Thinking...</span>
                    </div>
                 </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your answer here..."
                className="pr-20 min-h-[60px]"
                onKeyDown={(e) => {
                    if(e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                }}
                disabled={isLoading}
              />
              <Button type="submit" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2" disabled={isLoading || !input.trim()}>
                <CornerDownLeft size={20} />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
