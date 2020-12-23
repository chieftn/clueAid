import * as React from 'react';
import { GameCreateState, getInitialGameCreateState } from './state';

export type GameCreateStateContextType = [GameCreateState, (action: unknown) => void];
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const GameCreateStateContext = React.createContext<GameCreateStateContextType>([getInitialGameCreateState(), () => {}]);
