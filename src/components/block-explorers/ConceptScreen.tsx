
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Puzzle } from 'lucide-react';
import type { CodingLevel } from '@/lib/types';

interface ConceptScreenProps {
  level: CodingLevel;
  onStart: () => void;
}

export function ConceptScreen({ level, onStart }: ConceptScreenProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-3xl shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Lightbulb className="h-10 w-10 text-primary mr-3" />
            <CardTitle className="text-3xl font-bold">{level.concept.title}</CardTitle>
          </div>
          <CardDescription className="text-lg">Level {level.title.split(':')[0].replace('Level ','')} - Let's learn a new concept!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-6 rounded-lg mb-6">
            <p className="text-lg text-foreground leading-relaxed">
              {level.concept.explanation}
            </p>
          </div>
          <Button onClick={onStart} className="w-full text-xl py-7">
            <Puzzle className="mr-2 h-6 w-6" />
            Start Puzzle
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
