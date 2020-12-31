import * as React from 'react';
import { GameSuspicionCreateStateContext, GameSuspicionCreateStateContextType } from '../context';

export const useGameSuspicionCreateStateContext = (): GameSuspicionCreateStateContextType => React.useContext<GameSuspicionCreateStateContextType>(GameSuspicionCreateStateContext);
