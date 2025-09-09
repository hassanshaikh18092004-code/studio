"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AiTutor } from '@/components/block-explorers/AiTutor';
import { CodePalette } from '@/components/block-explorers/CodePalette';
import { CodeSequence } from '@/components/block-explorers/CodeSequence';
import { Maze } from '@/components/block-explorers/Maze';
import { LevelSelect } from '@/components/block-explorers/LevelSelect';
import { LEVELS } from '@/lib/maze-config';
import type { Block, BlockType, RobotState, Direction } from '@/lib/types';

// Helper to flatten the sequence for execution
const flattenSequence = (sequence: Block[]): Omit<Block, 'children'>[] => {
  const flat: Omit<Block, 'children'>[] = [];
  for (const block of sequence) {
    if (block.type === 'repeat' && block.children) {
      for (let i = 0; i < (block.times || 1); i++) {
        flat.push(...flattenSequence(block.children));
      }
    } else {
      const { children, ...rest } = block;
      flat.push(rest);
    }
  }
  return flat;
};

export default function BlockExplorersPage() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [sequence, setSequence] = useState<Block[]>([]);
  const [robotState, setRobotState] = useState<RobotState>(LEVELS[0].startState);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const { toast } = useToast();

  const currentLevel = useMemo(() => LEVELS[levelIndex], [levelIndex]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setCurrentStep(null);
    setRobotState(currentLevel.startState);
  }, [currentLevel]);
  
  useEffect(() => {
    setSequence([]);
    reset();
  }, [levelIndex, reset]);

  const addBlock = (type: BlockType, parentId?: string) => {
    if (isRunning) return;
    const newBlock: Block = { id: crypto.randomUUID(), type };
    if (type === 'repeat') {
      newBlock.times = 3;
      newBlock.children = [];
    }

    if (!parentId) {
      setSequence(prev => [...prev, newBlock]);
      return;
    }

    const addToParent = (blocks: Block[]): Block[] => {
      return blocks.map(b => {
        if (b.id === parentId) {
          if (b.type === 'repeat' && b.children) {
            return { ...b, children: [...b.children, newBlock] };
          }
        }
        if (b.children) {
          return { ...b, children: addToParent(b.children) };
        }
        return b;
      });
    };
    setSequence(addToParent);
  };

  const removeBlock = (id: string) => {
    if (isRunning) return;

    const removeFromSequence = (blocks: Block[]): Block[] => {
      const filtered = blocks.filter(b => b.id !== id);
      if (filtered.length < blocks.length) return filtered;

      return blocks.map(b => {
        if (b.children) {
          return { ...b, children: removeFromSequence(b.children) };
        }
        return b;
      });
    };
    setSequence(removeFromSequence);
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    // This is a simplified move for top-level blocks.
    // A full implementation would need to handle moving in/out of nested structures.
    if (isRunning) return;
    const index = sequence.findIndex(b => b.id === id);
    if (index === -1) return;
    const newSequence = [...sequence];
    const to = direction === 'up' ? index - 1 : index + 1;
    if (to < 0 || to >= newSequence.length) return;
    [newSequence[index], newSequence[to]] = [newSequence[to], newSequence[index]];
    setSequence(newSequence);
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    if (isRunning) return;
    const updateInSequence = (blocks: Block[]): Block[] => {
      return blocks.map(b => {
        if (b.id === id) {
          return { ...b, ...updates };
        }
        if (b.children) {
          return { ...b, children: updateInSequence(b.children) };
        }
        return b;
      });
    };
    setSequence(updateInSequence);
  };

  const handleRun = () => {
    if (isRunning || sequence.length === 0) return;
    setRobotState(currentLevel.startState);
    setIsRunning(true);
    setCurrentStep(0);
  };

  const executableSequence = useMemo(() => flattenSequence(sequence), [sequence]);

  useEffect(() => {
    if (!isRunning || currentStep === null || currentStep >= executableSequence.length) {
      if (isRunning) { // Finished sequence
        const { x, y } = robotState;
        if (currentLevel.maze[y]?.[x] !== 'goal') {
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
      const block = executableSequence[currentStep];
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
      if (y < 0 || x < 0 || y >= currentLevel.maze.length || x >= currentLevel.maze[y].length || currentLevel.maze[y][x] === 'wall') {
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

      if (currentLevel.maze[nextState.y][nextState.x] === 'goal') {
        toast({
          title: 'Congratulations!',
          description: `You completed ${currentLevel.title}!`,
        });
        setIsRunning(false);
        setCurrentStep(null);
        // Maybe move to next level?
        if (levelIndex < LEVELS.length - 1) {
          setTimeout(() => setLevelIndex(i => i + 1), 1000);
        }
        return;
      }

      setCurrentStep(step => (step !== null ? step + 1 : null));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isRunning, currentStep, robotState, executableSequence, toast, reset, currentLevel, levelIndex]);


  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body p-4 lg:p-6 gap-4 lg:gap-6 relative">
      <header className="flex items-center flex-shrink-0">
        <Bot className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-2xl lg:text-3xl font-bold font-headline">Block Explorers</h1>
        <AiTutor challengeDescription={currentLevel.description} />
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 flex-grow min-h-0">
        <div className="lg:col-span-3 min-h-[200px] lg:min-h-0">
          <CodePalette addBlock={addBlock} />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-4 min-h-[300px] lg:min-h-0">
          <CodeSequence 
            sequence={sequence}
            addBlock={addBlock}
            removeBlock={removeBlock} 
            moveBlock={moveBlock}
            updateBlock={updateBlock}
            currentStepId={null} // Simplified for now
            isRunning={isRunning}
          />
        </div>
        <div className="lg:col-span-5 flex flex-col gap-4">
          <Card className="flex-grow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                    <CardTitle>{currentLevel.title}</CardTitle>
                    <CardDescription>{currentLevel.description}</CardDescription>
                </div>
                <LevelSelect 
                    currentLevel={levelIndex}
                    totalLevels={LEVELS.length}
                    onLevelChange={setLevelIndex}
                />
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <Maze maze={currentLevel.maze} robotState={robotState} />
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
