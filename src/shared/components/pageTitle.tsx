import * as React from 'react';
import { Text } from '@fluentui/react';

export interface PageTitleProps {
    title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({title}: PageTitleProps) => {
    return (
        <h2>
            <Text block={true} variant={'large'}>{title}</Text>
        </h2>
    );
};
