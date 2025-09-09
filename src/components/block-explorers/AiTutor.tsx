"use client";

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getSimpleSummary } from '@/app/actions';

export function AiTutor() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleGetHint = async () => {
    setIsDialogOpen(true);
    if (summary || error) return;
    
    setIsLoading(true);
    const result = await getSimpleSummary();
    if (result.error) {
      setError(result.error);
    } else {
      setSummary(result.summary || 'Sorry, I could not come up with a hint.');
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="absolute top-4 right-4 z-10">
        <Button onClick={handleGetHint} variant="outline" size="lg" className="bg-accent/90 hover:bg-accent border-accent-foreground/20 text-accent-foreground shadow-lg">
          <Sparkles className="mr-2 h-5 w-5" />
          AI Tutor
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="text-accent" />
              AI Tutor says...
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 min-h-[80px] flex items-center justify-center">
            {isLoading ? (
              <div className="flex justify-center items-center gap-2 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Thinking...</span>
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <p className="text-sm text-foreground">{summary}</p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Got it!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
