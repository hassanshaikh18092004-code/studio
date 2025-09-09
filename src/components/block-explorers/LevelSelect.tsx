"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LevelSelectProps {
  currentLevel: number;
  totalLevels: number;
  onLevelChange: (levelIndex: number) => void;
}

export function LevelSelect({ currentLevel, totalLevels, onLevelChange }: LevelSelectProps) {
  const levels = Array.from({ length: totalLevels }, (_, i) => i);

  return (
    <Select
      value={String(currentLevel)}
      onValueChange={(value) => onLevelChange(Number(value))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a level" />
      </SelectTrigger>
      <SelectContent>
        {levels.map((level) => (
          <SelectItem key={level} value={String(level)}>
            Level {level + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
