import type { Level } from '@/lib/types';

export const LEVELS: Level[] = [
  {
    title: 'Level 1: The First Step',
    description: "Your goal is to guide the robot from the start tile (the star) to the goal tile (the flag). You can use 'Move Forward', 'Turn Left', and 'Turn Right' blocks to create a sequence of commands for the robot. Be careful not to hit the walls!",
    maze: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'start', 'empty', 'empty', 'goal', 'empty', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ],
    startState: { x: 1, y: 1, dir: 'RIGHT' },
  },
  {
    title: 'Level 2: Repetition is Key',
    description: "This path is longer. Instead of adding many 'Move Forward' blocks, try using the new 'Repeat' block to make your code more efficient! Drag other blocks inside the repeat block.",
    maze: [
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
      ['wall', 'start', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
      ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'goal', 'wall'],
    ],
    startState: { x: 1, y: 1, dir: 'RIGHT' },
  },
];
