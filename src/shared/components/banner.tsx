import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Text } from '@fluentui/react';
import { PATHS } from '../constants';
import './banner.scss';

export const Banner: React.FC = () => {
    const match = useRouteMatch();
    console.log(match.url);

    return (
        <div className="banner">
            <Text block={true} variant={'large'}>ClueAid</Text>

        </div>
    );
};
