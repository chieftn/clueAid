import * as React from 'react';
import { PrimaryButton, Text } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../constants';
import './home.scss';
import { usePageTitle } from '../hooks/useBanner';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    usePageTitle('');

    const onGetStartedClick = () => {
        navigate(PATHS.CREATE);
    };

    return (
        <div className="home">
            <h1><Text variant="xxLarge">ClueAid</Text></h1>
            <p><Text>A helper application for the popular board game.</Text></p>
            <div>
                <PrimaryButton text='Get started' onClick={onGetStartedClick} />
            </div>
        </div>
    );
};