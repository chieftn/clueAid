import * as React from 'react';
import { GameSuspicionCreateState, getInitialGameSuspicionCreateState } from './state';

export type GameSuspicionCreateStateContextType = [GameSuspicionCreateState, (action: unknown) => void];
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const GameSuspicionCreateStateContext = React.createContext<GameSuspicionCreateStateContextType>([getInitialGameSuspicionCreateState(), () => {}]);
