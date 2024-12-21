import React, { createContext, useContext, useState } from 'react';

interface ToolContextType {
    openedSidePopup: boolean;
    togglePopup: () => void;
}

// Создаем контекст с типом ToolContextType или undefined
const ToolContext = createContext<ToolContextType | undefined>(undefined);

interface ToolProviderProps {
    children: React.ReactNode; // Явно указываем тип для children
}

export const ToolProvider: React.FC<ToolProviderProps> = ({ children }) => {
    const [openedSidePopup, setOpenedSidePopup] = useState(false);

    const togglePopup = () => {
        setOpenedSidePopup(prevState => !prevState);
    };

    const value = {
        openedSidePopup,
        togglePopup,
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
