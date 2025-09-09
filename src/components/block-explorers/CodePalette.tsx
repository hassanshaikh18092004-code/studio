"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Move, RotateCcw, RotateCw, RefreshCcw } from 'lucide-react';
import type { BlockType } from '@/lib/types';

interface CodePaletteProps {
  addBlock: (type: BlockType) => void;
}

const availableBlocks: { type: BlockType; label: string; icon: React.ReactNode }[] = [
  { type: 'move', label: 'Move Forward', icon: <Move className="mr-2 h-4 w-4" /> },
  { type: 'turn-left', label: 'Turn Left', icon: <RotateCcw className="mr-2 h-4 w-4" /> },
  { type: 'turn-right', label: 'Turn Right', icon: <RotateCw className="mr-2 h-4 w-4" /> },
  { type: 'repeat', label: 'Repeat', icon: <RefreshCcw className="mr-2 h-4 w-4" /> },
];

export function CodePalette({ addBlock }: CodePaletteProps) {
  return (
    <Card className="h-full shadow-lg">
      <CardHeader>
        <CardTitle>Code Blocks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {availableBlocks.map((block) => (
            <Button
              key={block.type}
              variant="secondary"
              className="justify-start text-base py-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-px transition-all"
              onClick={() => addBlock(block.type)}
            >
              {block.icon}
              {block.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
