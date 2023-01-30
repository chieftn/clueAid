import * as React from 'react';
import { Text } from '@fluentui/react';
import { useBannerContext } from '../hooks/useBanner';
import './banner.css';

export const Banner: React.FC = () => {
    const { pageTitle } = useBannerContext();
    const suffix = React.useMemo(() => pageTitle ? ` | ${pageTitle}` : '', [pageTitle]);

    return (
        <div className="banner">
            <Text block={true} variant={'large'}>{`ClueAid${suffix}`}</Text>
        </div>
    );
};
