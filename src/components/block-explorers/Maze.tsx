"use client"

import { Bot, Flag, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Maze as MazeType, RobotState, Direction, MazeTile } from '@/lib/types';

interface MazeProps {
  maze: MazeType;
  robotState: RobotState;
}

const directionToRotation: Record<Direction, string> = {
  UP: '-rotate-90',
  RIGHT: 'rotate-0',
  DOWN: 'rotate-90',
  LEFT: 'rotate-180',
};

export function Maze({ maze, robotState }: MazeProps) {
  const getTileContent = (tile: MazeTile) => {
    switch (tile) {
      case 'wall':
        return <div className="w-full h-full bg-foreground/80 rounded-sm" />;
      case 'start':
        return <Star className="w-3/4 h-3/4 text-accent" fill="currentColor" />;
      case 'goal':
        return <Flag className="w-3/4 h-3/4 text-chart-2" fill="currentColor" />;
      case 'empty':
      default:
        return null;
    }
  }

  return (
    <div className="bg-card p-4 rounded-lg shadow-inner w-full max-w-[80vh] mx-auto">
      <div
        className="grid gap-1 aspect-square"
        style={{
          gridTemplateColumns: `repeat(${maze[0]?.length || 1}, 1fr)`,
        }}
      >
        {maze.map((row, y) =>
          row.map((tile, x) => (
            <div key={`${x}-${y}`} className="relative aspect-square flex items-center justify-center bg-background rounded-md">
              {getTileContent(tile)}
              {robotState.x === x && robotState.y === y && (
                <div className={cn("absolute inset-0 flex items-center justify-center transition-transform duration-300", directionToRotation[robotState.dir])}>
                  <Bot className="w-[90%] h-[90%] text-primary drop-shadow-lg" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
