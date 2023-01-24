import * as React from 'react';
import { Text } from '@fluentui/react';
import './banner.css';

export const Banner: React.FC = () => {
    return (
        <div className="banner">
            <Text block={true} variant={'large'}>ClueAid</Text>
        </div>
    );
};
