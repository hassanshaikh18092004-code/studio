
"use client";

import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import type { CodingLevel, CodeBlock } from '@/lib/types';

interface BlankSpaceProps {
  id: string;
  content: CodeBlock | null;
}

function BlankSpace({ id, content }: BlankSpaceProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "inline-block min-w-[120px] md:min-w-[150px] min-h-[36px] p-1 rounded-md border-2 border-dashed bg-background/50 text-center align-middle transition-colors",
        isOver ? "border-primary bg-primary/20" : "border-muted-foreground/50",
        content ? "border-solid !border-primary bg-primary/10" : ""
      )}
    >
      {content ? (
        <span className="font-mono text-xs md:text-sm p-1 rounded-sm text-primary-foreground bg-primary/80">
          {content.code}
        </span>
      ) : (
        <span className="text-muted-foreground text-xs p-1">Drop Here</span>
      )}
    </div>
  );
}

interface CodeEditorProps {
  level: CodingLevel;
  userAnswers: (CodeBlock | null)[];
}

export function CodeEditor({ level, userAnswers }: CodeEditorProps) {
  const codeParts = level.codeTemplate.reduce((acc, part, index) => {
    if (part === null) {
      const blankIndex = acc.filter(p => p.type === 'blank').length;
      acc.push({ type: 'blank', content: blankIndex, key: `blank-${index}` });
    } else {
      const lastPart = acc[acc.length - 1];
      if (lastPart && lastPart.type === 'code') {
        lastPart.content += '\n' + part;
      } else {
        acc.push({ type: 'code', content: part, key: `code-${index}` });
      }
    }
    return acc;
  }, [] as { type: 'code' | 'blank'; content: any; key: string }[]);

  return (
    <div className="w-full h-full bg-[#282c34] p-2 sm:p-4 rounded-lg shadow-inner font-mono text-left overflow-auto">
      <pre className="text-xs sm:text-sm whitespace-pre-wrap">
        {codeParts.map(part => {
          if (part.type === 'code') {
            return (
              <span key={part.key} style={{ color: '#abb2bf' }}>{part.content}</span>
            );
          } else {
            const blankIndex = part.content;
            return (
              <BlankSpace
                key={part.key}
                id={`blank-${blankIndex}`}
                content={userAnswers[blankIndex]}
              />
            );
          }
        })}
      </pre>
    </div>
  );
}
