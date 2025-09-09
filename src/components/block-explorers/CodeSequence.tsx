"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Move, RotateCcw, RotateCw, RefreshCcw, Trash2, ArrowUp, ArrowDown, CornerDownRight } from 'lucide-react';
import type { Block, BlockType } from '@/lib/types';

const blockInfo: Record<BlockType, { label: string; icon: React.ElementType; className: string }> = {
  move: { label: 'Move Forward', icon: Move, className: 'border-chart-1' },
  'turn-left': { label: 'Turn Left', icon: RotateCcw, className: 'border-chart-2' },
  'turn-right': { label: 'Turn Right', icon: RotateCw, className: 'border-chart-4' },
  'repeat': { label: 'Repeat', icon: RefreshCcw, className: 'border-chart-5' },
};

interface BlockItemProps {
  block: Block;
  removeBlock: (id: string) => void;
  moveBlock: (id: string, direction: 'up' | 'down') => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  addBlock: (type: BlockType, parentId?: string) => void;
  isDraggable?: boolean;
  isExecuting: boolean;
  isRunning: boolean;
  isLast: boolean;
  index: number;
}

const BlockItem: React.FC<BlockItemProps> = ({ block, removeBlock, moveBlock, updateBlock, addBlock, isDraggable = true, isExecuting, isRunning, isLast, index }) => {
  const Info = blockInfo[block.type];

  const handleTimesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const times = parseInt(e.target.value, 10);
    if (!isNaN(times) && times > 0) {
      updateBlock(block.id, { times });
    }
  };
  
  const isContainer = block.type === 'repeat';

  return (
    <div
      className={cn(
        'flex flex-col rounded-lg transition-all bg-card border-l-4 shadow-sm',
        Info.className,
        isExecuting && 'ring-2 ring-accent ring-offset-2 ring-offset-background'
      )}
    >
      <div className="flex items-center p-3">
        <Info.icon className="mr-3 h-5 w-5 flex-shrink-0" />
        <span className="flex-grow font-medium truncate">{Info.label}</span>
        {isContainer && (
           <div className="flex items-center gap-2 mr-2">
            <Input 
              type="number"
              value={block.times}
              onChange={handleTimesChange}
              className="w-16 h-8 text-center"
              min="1"
              disabled={isRunning}
            />
            <span className="text-sm text-muted-foreground">times</span>
           </div>
        )}
        {isDraggable && (
          <div className="flex gap-1 ml-2">
            <Button variant="ghost" size="icon" onClick={() => moveBlock(block.id, 'up')} disabled={index === 0 || isRunning} aria-label="Move up">
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => moveBlock(block.id, 'down')} disabled={isLast || isRunning} aria-label="Move down">
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        )}
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeBlock(block.id)} disabled={isRunning} aria-label="Remove block">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {isContainer && (
        <div className="pl-6 pr-2 pb-2">
          <div className="border-l-2 border-dashed border-gray-400 pl-4 py-2 flex flex-col gap-2">
            {block.children?.map((child, i) => (
              <BlockItem 
                key={child.id}
                block={child}
                removeBlock={removeBlock}
                moveBlock={() => {}} // Simplified: no moving inside loops for now
                updateBlock={updateBlock}
                addBlock={addBlock}
                isDraggable={false}
                isExecuting={false} // Simplified
                isRunning={isRunning}
                isLast={i === (block.children?.length ?? 0) - 1}
                index={i}
              />
            ))}
             <Button variant="ghost" size="sm" onClick={() => addBlock('move', block.id)} disabled={isRunning} className="justify-start mt-1">
                <CornerDownRight className="mr-2 h-4 w-4"/>
                Add block inside
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

interface CodeSequenceProps {
  sequence: Block[];
  addBlock: (type: BlockType, parentId?: string) => void;
  removeBlock: (id: string) => void;
  moveBlock: (id: string, direction: 'up' | 'down') => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  currentStepId: string | null;
  isRunning: boolean;
}

export function CodeSequence({ sequence, addBlock, removeBlock, moveBlock, updateBlock, currentStepId, isRunning }: CodeSequenceProps) {
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
              sequence.map((block, index) => (
                <BlockItem
                  key={block.id}
                  block={block}
                  removeBlock={removeBlock}
                  moveBlock={moveBlock}
                  updateBlock={updateBlock}
                  addBlock={addBlock}
                  isExecuting={currentStepId === block.id}
                  isRunning={isRunning}
                  isLast={index === sequence.length - 1}
                  index={index}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
