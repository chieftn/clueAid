import * as React from 'react';
import { GameStateContext, GameStateContextType } from '../context';

export const useGameStateContext = () => React.useContext<GameStateContextType>(GameStateContext);