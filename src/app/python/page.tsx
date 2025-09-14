
"use client";

import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, Blocks, Home, Lightbulb, Puzzle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CodePalette } from '@/components/block-explorers/CodePalette';
import { CodeEditor } from '@/components/block-explorers/CodeEditor';
import { LevelSelect } from '@/components/block-explorers/LevelSelect';
import { ConceptScreen } from '@/components/block-explorers/ConceptScreen';
import { PYTHON_LEVELS } from '@/lib/python-levels-config';
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

const PROGRESS_KEY_PREFIX = 'python-progress-';

export default function PythonChallengePage() {
  const [user, setUser] = useState<string | null>(null);
  const [levelIndex, setLevelIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(CodeBlockType | null)[]>([]);
  const [gameState, setGameState] = useState<'concept' | 'challenge'>('concept');
  const [isConceptVisible, setIsConceptVisible] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('blockExplorerUser');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(storedUser);
      const progressKey = `${PROGRESS_KEY_PREFIX}${storedUser}`;
      const savedLevelIndex = localStorage.getItem(progressKey);
      const initialLevel = savedLevelIndex ? parseInt(savedLevelIndex, 10) : 0;
      handleLevelChange(initialLevel, true);
    }
  }, [router]);

  const currentLevel = useMemo(() => PYTHON_LEVELS[levelIndex], [levelIndex]);

  const resetLevel = useCallback(() => {
    if (currentLevel) {
      setUserAnswers(Array(currentLevel.blanks).fill(null));
    }
  }, [currentLevel]);

  useEffect(() => {
    resetLevel();
  }, [levelIndex, resetLevel]);

  const handleLevelChange = (index: number, isInitialLoad = false) => {
    if (index >= PYTHON_LEVELS.length) index = PYTHON_LEVELS.length - 1;
    setLevelIndex(index);
    setUserAnswers(Array(PYTHON_LEVELS[index].blanks).fill(null));
    if (!isInitialLoad) {
        setGameState('concept');
    }

    if (user) {
        const progressKey = `${PROGRESS_KEY_PREFIX}${user}`;
        localStorage.setItem(progressKey, String(index));
    }
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

  const startChallenge = () => {
    setGameState('challenge');
  };
  
  if (!user || !currentLevel) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
            <p>Loading...</p>
        </div>
    );
  }

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
            <Blocks className="h-8 w-8 text-primary mr-2 md:mr-3" />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-headline truncate">Python Challenge</h1>
          </div>
          <LevelSelect 
              currentLevel={levelIndex}
              totalLevels={PYTHON_LEVELS.length}
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
                    <div className="max-h-[50vh] overflow-y-auto bg-card p-4 rounded-md border text-card-foreground">
                      <pre><code className="text-sm">{currentLevel.concept.example}</code></pre>
                    </div>
                </div>
            )}
        </DialogContent>
      </Dialog>
    </DndContext>
  );
}
