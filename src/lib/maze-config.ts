import type { Maze, RobotState } from '@/lib/types';

export const LEVEL_1_MAZE: Maze = [
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ['wall', 'start', 'empty', 'wall', 'empty', 'empty', 'empty', 'wall'],
  ['wall', 'empty', 'empty', 'wall', 'empty', 'wall', 'empty', 'wall'],
  ['wall', 'empty', 'wall', 'wall', 'empty', 'wall', 'goal', 'wall'],
  ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
];

export const LEVEL_1_START_STATE: RobotState = { x: 1, y: 1, dir: 'RIGHT' };

export const CHALLENGE_DESCRIPTION = "Your goal is to guide the robot from the start tile (the star) to the goal tile (the flag). You can use 'Move Forward', 'Turn Left', and 'Turn Right' blocks to create a sequence of commands for the robot. Be careful not to hit the walls!";
