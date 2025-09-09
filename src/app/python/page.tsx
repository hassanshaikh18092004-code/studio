
"use client";

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, Bot, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CodePalette } from '@/components/block-explorers/CodePalette';
import { CodeEditor } from '@/components/block-explorers/CodeEditor';
import { LevelSelect } from '@/components/block-explorers/LevelSelect';
import { PYTHON_LEVELS } from '@/lib/python-levels-config';
import type { CodeBlock as CodeBlockType } from '@/lib/types';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core';

export default function PythonChallengePage() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(CodeBlockType | null)[]>([]);
  const { toast } = useToast();

  const currentLevel = useMemo(() => PYTHON_LEVELS[levelIndex], [levelIndex]);

  const resetLevel = useCallback(() => {
    setUserAnswers(Array(currentLevel.blanks).fill(null));
  }, [currentLevel]);

  useState(() => {
    resetLevel();
  });

  const handleLevelChange = (index: number) => {
    setLevelIndex(index);
    setUserAnswers(Array(PYTHON_LEVELS[index].blanks).fill(null));
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
      if (levelIndex < PYTHON_LEVELS.length - 1) {
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

  return (
    <DndContext onDragEnd={handleDrop} collisionDetection={closestCenter}>
      <div className="flex flex-col h-screen bg-background text-foreground font-body p-4 lg:p-6 gap-4 lg:gap-6 relative">
        <header className="flex items-center flex-shrink-0">
          <Link href="/" passHref>
            <Button variant="outline" size="icon" className="mr-4">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
          <Bot className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl lg:text-3xl font-bold font-headline">Python Language Challenge</h1>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 flex-grow min-h-0">
          <div className="lg:col-span-4 min-h-[200px] lg:min-h-0">
            <CodePalette options={currentLevel.options} />
          </div>
          <div className="lg:col-span-8 flex flex-col gap-4">
            <Card className="flex-grow flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                      <CardTitle>{currentLevel.title}</CardTitle>
                      <CardDescription>{currentLevel.description}</CardDescription>
                  </div>
                  <LevelSelect 
                      currentLevel={levelIndex}
                      totalLevels={PYTHON_LEVELS.length}
                      onLevelChange={handleLevelChange}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-center justify-center">
                  <CodeEditor 
                    level={currentLevel}
                    userAnswers={userAnswers}
                  />
              </CardContent>
            </Card>
            <div className="flex gap-4">
                <Button onClick={checkAnswer} className="w-full text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Play className="mr-2 h-5 w-5" />
                    Check Answer
                </Button>
                <Button onClick={resetLevel} variant="outline" className="w-full text-lg py-6">
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Reset
                </Button>
            </div>
          </div>
        </main>
      </div>
    </DndContext>
  );
}
