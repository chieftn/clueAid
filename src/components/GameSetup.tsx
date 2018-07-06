import * as React from 'react';
import * as PropTypes from "prop-Types";
import {Button} from "react-bootstrap";
import {ControlLabel} from "react-bootstrap";
import {FormControl} from "react-bootstrap";
import {FormGroup} from "react-bootstrap";
import {HelpBlock} from "react-bootstrap";

import * as gameActions from "../actions/gameActions";

export interface GameSetupProps {}
export class GameSetup extends React.Component<GameSetupProps, {}> {

    static contextTypes = {
        store: PropTypes.object
    }

    constructor(props: GameSetupProps) {
        super(props);
        
    }

    private getValidationState(): any {
       
    }

    private createGame(): void {
        let {store} = this.context;
        store.dispatch(gameActions.addGame);
    }


    render() {
        return( 
            <div className="gameSetup">
                <form>
                    <div className="gameSetupForm">
                        
                        <div className="gameSetupSection">
                            <div className="gameSetupSectionHeader">Who's playing (and in what order)?</div>
                            
                            <FormGroup controlId="nameLabel">
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Player Name"
                                />
                                <FormControl.Feedback />
                                <HelpBlock>Validation is based on string length.</HelpBlock>
                            </FormGroup>
                        
                        </div>

                        <div className="gameSetupSection">
                            <div className="gameSetupSectionHeader">What cards do you have?</div>
                        </div>

                        <div className="gameSetupSection">
                            <Button type="submit" onClick={()=>this.createGame()}>Submit</Button>
                        </div>
                    </div>

                </form>
            </div>)
    }
}

