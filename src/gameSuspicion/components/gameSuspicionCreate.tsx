import * as React from 'react';
import { PrimaryButton, DefaultButton, Dropdown } from '@fluentui/react';
import { useHistory, Prompt } from 'react-router-dom';
import { useGameStateContext } from '../../game/hooks/useGameStateContext';
import { GameNotStartedWarning } from '../../shared/components/gameNotStartedWarning';
import { PageTitle } from '../../shared/components/pageTitle';


export const GameSuspicionCreate: React.FC = () => {
    const [{ game }] = useGameStateContext();


    return (
        <>
            <GameNotStartedWarning />
            <div className="content">
                <PageTitle title="Add Suspicion" />
                {game &&
                    <>
                        <Dropdown
                            label="Suspecting player"
                            options={[]}
                        />

                        <Dropdown
                            label="Suspects"
                            options={[]}
                        />

                        <Dropdown
                          label="With the"
                          options={[]}
                        />

                        <Dropdown
                            label="In the"
                            options={[]}
                        />
                    </>
                }
            </div>
        </>
    );
};