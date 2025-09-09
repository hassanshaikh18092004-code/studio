export type BlockType = 'move' | 'turn-left' | 'turn-right' | 'repeat';

export interface Block {
  id: string;
  type: BlockType;
  // for repeat blocks
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

export interface Level {
  maze: Maze;
  startState: RobotState;
  description: string;
  title: string;
}
