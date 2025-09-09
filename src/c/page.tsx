
"use client";

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, Bot, Home, Lightbulb, Puzzle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CodePalette } from '@/components/block-explorers/CodePalette';
import { CodeEditor } from '@/components/block-explorers/CodeEditor';
import { LevelSelect } from '@/components/block-explorers/LevelSelect';
import { ConceptScreen } from '@/components/block-explorers/ConceptScreen';
import { C_LEVELS } from '@/lib/c-levels-config';
import type { CodeBlock as CodeBlockType } from '@/lib/types';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export default function CChallengePage() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(CodeBlockType | null)[]>([]);
  const [gameState, setGameState] = useState<'concept' | 'challenge'>('concept');
  const [isConceptVisible, setIsConceptVisible] = useState(false);
  const { toast } = useToast();

  const currentLevel = useMemo(() => C_LEVELS[levelIndex], [levelIndex]);

  const resetLevel = useCallback(() => {
    setUserAnswers(Array(currentLevel.blanks).fill(null));
  }, [currentLevel]);

  useState(() => {
    resetLevel();
  });

  const handleLevelChange = (index: number) => {
    setLevelIndex(index);
    setUserAnswers(Array(C_LEVELS[index].blanks).fill(null));
    setGameState('concept');
  };
  
  const handleDrop = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
  
    const blankIndexStr = over.id.toString().split('-')[1];
    if (!blankIndexStr) return;
    const blankIndex = parseInt(blankIndexStr, 10);
  
    const optionId = active.id.toString();
    const droppedOption = currentLevel.options.find(opt => opt.id === optionId);
  
    if (droppedOption) {
      setUserAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[blankIndex] = droppedOption;
        return newAnswers;
      });
    }
  };

  const checkAnswer = () => {
    if (userAnswers.some(a => a === null)) {
      toast({
        title: "Incomplete",
        description: "Please fill in all the blanks before checking your answer.",
        variant: 'destructive',
      });
      return;
    }

    const correct = userAnswers.every((answer, index) => answer?.id === currentLevel.solution[index]);

    if (correct) {
      toast({
        title: 'Congratulations!',
        description: `You solved ${currentLevel.title}!`,
      });
      if (levelIndex < C_LEVELS.length - 1) {
        setTimeout(() => handleLevelChange(levelIndex + 1), 1000);
      }
    } else {
      toast({
        title: 'Not quite...',
        description: "The code isn't correct. Keep trying!",
        variant: 'destructive',
      });
    }
  };

  const startChallenge = () => {
    setGameState('challenge');
  };

  return (
    <DndContext onDragEnd={handleDrop} collisionDetection={closestCenter}>
      <div className="flex flex-col h-screen bg-background text-foreground font-body p-4 lg:p-6 gap-4 lg:gap-6">
        <header className="flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <Link href="/" passHref>
              <Button variant="outline" size="icon" className="mr-2 md:mr-4">
                <Home className="h-4 w-4" />
              </Button>
            </Link>
            <Bot className="h-8 w-8 text-primary mr-2 md:mr-3" />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-headline truncate">C Challenge</h1>
          </div>
          <LevelSelect 
            currentLevel={levelIndex}
            totalLevels={C_LEVELS.length}
            onLevelChange={handleLevelChange}
          />
        </header>

        {gameState === 'concept' ? (
          <main className="flex-grow min-h-0">
            <ConceptScreen 
              level={currentLevel}
              onStart={startChallenge}
            />
          </main>
        ) : (
          <main className="grid lg:grid-cols-2 gap-4 lg:gap-6 flex-grow min-h-0">
            <div className="flex flex-col gap-4 flex-grow min-h-0">
                <Card className="flex-grow flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-start gap-2">
                            <div>
                                <CardTitle className="text-lg lg:text-xl">{currentLevel.title}</CardTitle>
                                <CardDescription className="text-sm lg:text-base">{currentLevel.description}</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => setIsConceptVisible(true)}>
                                <Lightbulb className="mr-2 h-4 w-4" />
                                Hint
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-center justify-center p-2 sm:p-6">
                        <CodeEditor
                            level={currentLevel}
                            userAnswers={userAnswers}
                        />
                    </CardContent>
                </Card>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={checkAnswer} className="w-full text-lg py-6">
                        <Play className="mr-2 h-5 w-5" />
                        Check Answer
                    </Button>
                    <Button onClick={resetLevel} variant="outline" className="w-full text-lg py-6">
                        <RefreshCw className="mr-2 h-5 w-5" />
                        Reset
                    </Button>
                </div>
            </div>
            <div className="lg:h-full flex flex-col">
              <CodePalette options={currentLevel.options} />
            </div>
          </main>
        )}
      </div>

      <Dialog open={isConceptVisible} onOpenChange={setIsConceptVisible}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
                <Lightbulb className="h-6 w-6 text-primary" />
                {currentLevel.concept.title}
            </DialogTitle>
            <DialogDescription className="pt-2 text-base">
              {currentLevel.concept.explanation}
            </DialogDescription>
          </DialogHeader>
          {currentLevel.concept.example && (
                <div className="mt-2">
                    <h4 className="text-md font-semibold mb-2 text-foreground/80">Example:</h4>
                    <div className="max-h-[50vh] overflow-y-auto bg-[#f5f5f5] p-4 rounded-md border text-black">
                      <pre><code>{currentLevel.concept.example}</code></pre>
                    </div>
                </div>
            )}
        </DialogContent>
      </Dialog>
    </DndContext>
  );
}
