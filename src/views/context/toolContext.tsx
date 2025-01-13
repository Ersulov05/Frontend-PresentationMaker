import React, { createContext, useContext, useState } from 'react';

interface ToolContextType {
    openedPresentationPreview: boolean
    openedSidePopup: boolean
    togglePopup: () => void
    togglePresentationPreview: () => void
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

interface ToolProviderProps {
    children: React.ReactNode; 
}

export const ToolProvider: React.FC<ToolProviderProps> = ({ children }) => {
    const [openedSidePopup, setOpenedSidePopup] = useState(false);
    const [openedPresentationPreview, setOpenedPresentationPreview] = useState(false);

    const togglePopup = () => {
        setOpenedSidePopup(prevState => !prevState);
    };

    const togglePresentationPreview = () => {
        setOpenedPresentationPreview(prevState => !prevState);
    };

    const value = {
        openedPresentationPreview,
        openedSidePopup,
        togglePopup,
        togglePresentationPreview,
    }

    return (
        <ToolContext.Provider value={value}>
            {children}
        </ToolContext.Provider>
    );
};

export const useToolContext = () => {
    return useContext(ToolContext);
};
