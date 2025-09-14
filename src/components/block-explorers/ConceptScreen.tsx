
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Puzzle } from 'lucide-react';
import type { CodingLevel } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ConceptScreenProps {
  level: CodingLevel;
  onStart: () => void;
}

export function ConceptScreen({ level, onStart }: ConceptScreenProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex items-center justify-center min-h-full p-1">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
              <Lightbulb className="h-8 md:h-10 w-8 md:w-10 text-primary mr-3" />
              <CardTitle className="text-2xl md:text-3xl font-bold">{level.concept.title}</CardTitle>
            </div>
            <CardDescription className="text-base md:text-lg">Level {level.title.split(':')[0].replace('Level ','')} - Let's learn a new concept!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 md:p-6 rounded-lg mb-6">
              <p className="text-base md:text-lg text-foreground leading-relaxed">
                {level.concept.explanation}
              </p>
              {level.concept.example && (
                  <div className="mt-4">
                      <h4 className="text-md font-semibold mb-2 text-foreground/80">Example:</h4>
                      <div className="max-h-[40vh] overflow-y-auto bg-card p-4 rounded-md border text-card-foreground">
                         <pre><code>{level.concept.example}</code></pre>
                      </div>
                  </div>
              )}
            </div>
            <Button onClick={onStart} className="w-full text-xl py-7">
              <Puzzle className="mr-2 h-6 w-6" />
              Start Puzzle
            </Button>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
