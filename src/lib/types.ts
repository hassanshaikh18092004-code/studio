
// Types for the original Block Explorers maze game
export type BlockType = 'move' | 'turn-left' | 'turn-right' | 'repeat';

export interface Block {
  id: string;
  type: BlockType;
  times?: number;
  children?: Block[];
}

export type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

export interface RobotState {
  x: number;
  y: number;
  dir: Direction;
}

export type MazeTile = 'empty' | 'wall' | 'start' | 'goal';
export type Maze = MazeTile[][];

export interface MazeLevel {
  maze: Maze;
  startState: RobotState;
  description: string;
  title: string;
}


// Types for the C Language Challenge
export interface CodeBlock {
  id: string;
  code: string;
}

export interface CLevel {
  title: string;
  description: string;
  codeTemplate: (string | null)[]; // string for code, null for a blank
  options: CodeBlock[];
  solution: string[]; // array of correct option IDs
  blanks: number;
}
