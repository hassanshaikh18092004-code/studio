
"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { CodeBlock } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodePaletteProps {
  options: CodeBlock[];
}

function DraggableOption({ option, index }: { option: CodeBlock, index: number }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: option.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  const label = String.fromCharCode(65 + index); // 65 is ASCII for 'A'

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 bg-background border rounded-lg font-mono text-sm shadow-sm cursor-grab active:cursor-grabbing active:shadow-md active:ring-2 active:ring-primary flex items-center gap-4"
    >
      <span className='font-bold text-lg text-primary'>{label}</span>
      <code>{option.code}</code>
    </div>
  );
}

export function CodePalette({ options }: CodePaletteProps) {
  return (
    <Card className="h-full shadow-lg flex flex-col">
      <CardHeader className='pb-2'>
        <CardTitle>Code Snippets</CardTitle>
        <p className="text-sm text-muted-foreground pt-1">Drag a snippet to a blank space in the editor.</p>
      </CardHeader>
      <CardContent className="flex-grow min-h-0">
        <ScrollArea className="h-full pr-4 -mr-4">
          <div className="grid grid-cols-1 gap-3">
            {options.map((option, index) => (
              <DraggableOption key={option.id} option={option} index={index} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
