import * as React from 'react';
import { GameState, getInitialGameState } from './state';

export type GameStateContextType = [GameState, (action: unknown) => void];
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const GameStateContext = React.createContext<GameStateContextType>([getInitialGameState(), () => {}]);
