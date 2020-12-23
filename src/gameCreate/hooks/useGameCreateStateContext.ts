import * as React from 'react';
import { GameCreateStateContext, GameCreateStateContextType } from '../context';

export const useGameCreateStateContext = (): GameCreateStateContextType => React.useContext<GameCreateStateContextType>(GameCreateStateContext);
