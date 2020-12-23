import * as React from 'react';
import { GameStateContext, GameStateContextType } from '../context';

export const useGameStateContext = (): GameStateContextType => React.useContext<GameStateContextType>(GameStateContext);