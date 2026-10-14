import { GameId } from '../../types';
import { MAZE_LEVELS } from './mazeLevels';
import { BLOCK_LEVELS } from './blockLevels';
import { PATTERN_LEVELS } from './patternLevels';
import { DEBUG_LEVELS } from './debugLevels';
import { LOOP_LEVELS } from './loopLevels';
import { IFELSE_LEVELS } from './ifelseLevels';
import { BUILDER_LEVELS } from './builderLevels';

export {
  MAZE_LEVELS,
  BLOCK_LEVELS,
  PATTERN_LEVELS,
  DEBUG_LEVELS,
  LOOP_LEVELS,
  IFELSE_LEVELS,
  BUILDER_LEVELS,
};

export function getLevelsForGame(gameId: GameId) {
  switch (gameId) {
    case 'maze':
      return MAZE_LEVELS;
    case 'block':
      return BLOCK_LEVELS;
    case 'pattern':
      return PATTERN_LEVELS;
    case 'debug':
      return DEBUG_LEVELS;
    case 'loop':
      return LOOP_LEVELS;
    case 'ifelse':
      return IFELSE_LEVELS;
    case 'builder':
      return BUILDER_LEVELS;
    default:
      return [];
  }
}

export function getLevelData(gameId: GameId, levelNumber: number) {
  const levels = getLevelsForGame(gameId);
  return levels.find(l => l.levelNumber === levelNumber) || levels[0];
}
