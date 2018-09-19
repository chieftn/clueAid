import * as React from 'react';
import { Suspicion } from '../../model/suspicion';

export interface GameTrackerSuspicionSummaryProps {
    suspicions: Suspicion[]
}

export class GameTrackerSuspicionSummary extends React.Component<GameTrackerSuspicionSummaryProps, {}> {

    constructor(props: GameTrackerSuspicionSummaryProps) {
        super(props);
    }
    
    render(): JSX.Element {
        return <div>
            <table className='gameTrackSuspicionSummaryTable'>
                <tr>
                    <th>Character</th>
                    <th>Weapon</th>
                    <th>Room</th>
                    <th>Raised By</th>
                    <th>Alibi From</th>
                </tr>             
                {this.props.suspicions.map(suspicion => <tr>
                    <td>{suspicion.suspectedCharacter}</td>
                    <td>{suspicion.suspectedWeapon}</td>
                    <td>{suspicion.suspectedRoom}</td>
                    <td>{suspicion.suspectingPlayer}</td>
                    <td>{suspicion.alibiFrom}</td>
                </tr>)} 
            </table>    
        </div>
    }
}