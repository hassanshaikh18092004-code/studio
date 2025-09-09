export type BlockType = 'move' | 'turn-left' | 'turn-right';

export interface Block {
  id: string;
  type: BlockType;
}

export type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

export interface RobotState {
  x: number;
  y: number;
  dir: Direction;
}

export type MazeTile = 'empty' | 'wall' | 'start' | 'goal';

export type Maze = MazeTile[][];
