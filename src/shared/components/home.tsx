import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';
import { useHistory } from 'react-router-dom';
import { PATHS } from '../constants';
import './home.scss';

export const Home: React.FC = () => {
    const { push } = useHistory();

    const onGetStartedClick = () => {
        push(PATHS.CREATE);
    };

    return (
        <div className="home">
            <h1>ClueAid</h1>
            <p>A helper application for the popular board game.</p>
            <div>
                <PrimaryButton text='Get started' onClick={onGetStartedClick} />
            </div>
        </div>
    );
};