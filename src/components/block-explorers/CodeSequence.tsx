"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Move, RotateCcw, RotateCw, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import type { Block } from '@/lib/types';

interface CodeSequenceProps {
  sequence: Block[];
  removeBlock: (id: string) => void;
  moveBlock: (id: string, direction: 'up' | 'down') => void;
  currentStep: number | null;
  isRunning: boolean;
}

const blockInfo = {
  move: { label: 'Move Forward', icon: Move, className: 'border-chart-1' },
  'turn-left': { label: 'Turn Left', icon: RotateCcw, className: 'border-chart-2' },
  'turn-right': { label: 'Turn Right', icon: RotateCw, className: 'border-chart-4' },
};

export function CodeSequence({ sequence, removeBlock, moveBlock, currentStep, isRunning }: CodeSequenceProps) {
  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader>
        <CardTitle>Action Sequence</CardTitle>
        <CardDescription>Arrange blocks to command your robot.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow min-h-0">
        <ScrollArea className="h-full pr-4 -mr-4">
          <div className="flex flex-col gap-2">
            {sequence.length === 0 ? (
              <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg h-full flex items-center justify-center">
                Add blocks from the left panel to start.
              </div>
            ) : (
              sequence.map((block, index) => {
                const Info = blockInfo[block.type];
                const isExecuting = isRunning && currentStep === index;
                return (
                  <div
                    key={block.id}
                    className={cn(
                      'flex items-center p-3 rounded-lg transition-all bg-card border-l-4 shadow-sm',
                      Info.className,
                      isExecuting && 'ring-2 ring-accent ring-offset-2 ring-offset-background'
                    )}
                  >
                    <Info.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="flex-grow font-medium truncate">{Info.label}</span>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveBlock(block.id, 'up')}
                        disabled={index === 0 || isRunning}
                        aria-label="Move up"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveBlock(block.id, 'down')}
                        disabled={index === sequence.length - 1 || isRunning}
                        aria-label="Move down"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeBlock(block.id)}
                        disabled={isRunning}
                        aria-label="Remove block"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
