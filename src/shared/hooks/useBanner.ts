import { useState, createContext, useContext, useEffect } from 'react';


export const BannerContext = createContext<BannerContextType>({ pageTitle: '', setPageTitle: () => undefined });

export interface BannerContextType {
    pageTitle: string;
    setPageTitle(title: string): void;
}

export const useBanner = (): BannerContextType => {
    const [pageTitle, setPageTitle] = useState('');

    return {
        pageTitle,
        setPageTitle
    };
};

export const useBannerContext = (): BannerContextType => useContext<BannerContextType>(BannerContext);

export const usePageTitle = (title: string): void => {
    const { setPageTitle } = useBannerContext();

    useEffect(() => setPageTitle(title), []);
};