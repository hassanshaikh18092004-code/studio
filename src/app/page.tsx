"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AiTutor } from '@/components/block-explorers/AiTutor';
import { CodePalette } from '@/components/block-explorers/CodePalette';
import { CodeSequence } from '@/components/block-explorers/CodeSequence';
import { Maze } from '@/components/block-explorers/Maze';
import { LEVEL_1_MAZE, LEVEL_1_START_STATE, CHALLENGE_DESCRIPTION } from '@/lib/maze-config';
import type { Block, BlockType, RobotState, Direction } from '@/lib/types';

export default function BlockExplorersPage() {
  const [sequence, setSequence] = useState<Block[]>([]);
  const [robotState, setRobotState] = useState<RobotState>(LEVEL_1_START_STATE);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const { toast } = useToast();

  const addBlock = (type: BlockType) => {
    if (isRunning) return;
    const newBlock: Block = { id: crypto.randomUUID(), type };
    setSequence(prev => [...prev, newBlock]);
  };

  const removeBlock = (id: string) => {
    if (isRunning) return;
    setSequence(prev => prev.filter(block => block.id !== id));
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    if (isRunning) return;
    const index = sequence.findIndex(b => b.id === id);
    if (index === -1) return;
    const newSequence = [...sequence];
    const to = direction === 'up' ? index - 1 : index + 1;
    if (to < 0 || to >= newSequence.length) return;
    [newSequence[index], newSequence[to]] = [newSequence[to], newSequence[index]];
    setSequence(newSequence);
  };

  const reset = useCallback(() => {
    setIsRunning(false);
    setCurrentStep(null);
    setRobotState(LEVEL_1_START_STATE);
  }, []);

  const handleRun = () => {
    if (isRunning || sequence.length === 0) return;
    setRobotState(LEVEL_1_START_STATE);
    setIsRunning(true);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (!isRunning || currentStep === null || currentStep >= sequence.length) {
      if (isRunning) { // Finished sequence
        const { x, y } = robotState;
        if (LEVEL_1_MAZE[y]?.[x] !== 'goal') {
            toast({
              title: "Almost there!",
              description: "You've completed the sequence, but haven't reached the goal. Try adjusting your blocks.",
              variant: 'default'
            });
        }
        setIsRunning(false);
        setCurrentStep(null);
      }
      return;
    }

    const timeoutId = setTimeout(() => {
      const block = sequence[currentStep];
      let nextState: RobotState = { ...robotState };

      if (block.type === 'move') {
        let { x, y } = nextState;
        if (nextState.dir === 'UP') y--;
        else if (nextState.dir === 'RIGHT') x++;
        else if (nextState.dir === 'DOWN') y++;
        else if (nextState.dir === 'LEFT') x--;
        nextState = { ...nextState, x, y };
      } else if (block.type === 'turn-left') {
        const dirMap: Record<Direction, Direction> = { 'UP': 'LEFT', 'LEFT': 'DOWN', 'DOWN': 'RIGHT', 'RIGHT': 'UP' };
        nextState = { ...nextState, dir: dirMap[nextState.dir] };
      } else if (block.type === 'turn-right') {
        const dirMap: Record<Direction, Direction> = { 'UP': 'RIGHT', 'RIGHT': 'DOWN', 'DOWN': 'LEFT', 'LEFT': 'UP' };
        nextState = { ...nextState, dir: dirMap[nextState.dir] };
      }
      
      const { x, y } = nextState;
      if (y < 0 || x < 0 || y >= LEVEL_1_MAZE.length || x >= LEVEL_1_MAZE[y].length || LEVEL_1_MAZE[y][x] === 'wall') {
        toast({
          title: 'Oops! Hit a wall.',
          description: 'The robot cannot move through walls. Please reset and try again.',
          variant: 'destructive',
        });
        setIsRunning(false);
        setCurrentStep(null);
        return;
      }

      setRobotState(nextState);

      if (LEVEL_1_MAZE[nextState.y][nextState.x] === 'goal') {
        toast({
          title: 'Congratulations!',
          description: 'You completed the level!',
        });
        setIsRunning(false);
        setCurrentStep(null);
        return;
      }

      setCurrentStep(step => (step !== null ? step + 1 : null));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isRunning, currentStep, robotState, sequence, toast, reset]);


  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body p-4 lg:p-6 gap-4 lg:gap-6 relative">
      <header className="flex items-center flex-shrink-0">
        <Bot className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-2xl lg:text-3xl font-bold font-headline">Block Explorers</h1>
        <AiTutor />
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 flex-grow min-h-0">
        <div className="lg:col-span-3 min-h-[200px] lg:min-h-0">
          <CodePalette addBlock={addBlock} />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-4 min-h-[300px] lg:min-h-0">
          <CodeSequence 
            sequence={sequence} 
            removeBlock={removeBlock} 
            moveBlock={moveBlock}
            currentStep={currentStep}
            isRunning={isRunning}
          />
        </div>
        <div className="lg:col-span-5 flex flex-col gap-4">
          <Card className="flex-grow">
            <CardHeader>
              <CardTitle>Level 1: The First Step</CardTitle>
              <CardDescription>{CHALLENGE_DESCRIPTION}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <Maze maze={LEVEL_1_MAZE} robotState={robotState} />
            </CardContent>
          </Card>
          <div className="flex gap-4">
              <Button onClick={handleRun} disabled={isRunning || sequence.length === 0} className="w-full text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Play className="mr-2 h-5 w-5" />
                  Run
              </Button>
              <Button onClick={reset} variant="outline" className="w-full text-lg py-6">
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Reset
              </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
