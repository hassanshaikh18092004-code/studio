
"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { CodeBlock } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CodePaletteProps {
  options: CodeBlock[];
}

function DraggableOption({ option }: { option: CodeBlock }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: option.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-3 bg-secondary rounded-lg font-mono text-sm shadow-sm cursor-grab active:cursor-grabbing active:shadow-md active:ring-2 active:ring-primary"
    >
      {option.code}
    </div>
  );
}

export function CodePalette({ options }: CodePaletteProps) {
  return (
    <Card className="h-full shadow-lg">
      <CardHeader>
        <CardTitle>Code Snippets</CardTitle>
        <CardContent className='pt-4 px-0'>
          <p className="text-sm text-muted-foreground pb-4">Drag a snippet to a blank space in the editor.</p>
          <div className="flex flex-col gap-3">
            {options.map((option) => (
              <DraggableOption key={option.id} option={option} />
            ))}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
