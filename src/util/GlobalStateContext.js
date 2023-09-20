
import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};

export const GlobalStateProvider = ({ children }) => {

    const [globalState, setGlobalState] = useState({
        grantType: '',
        accessToken: '',
    });

    const getAuthorization = () => {
        return `${globalState.grantType} ${globalState.accessToken}`;
    };
    
    const setAuthorization = (newAccessToken) => {
        globalState.grantType = newAccessToken.split(' ')[0];
        globalState.accessToken = newAccessToken.split(' ')[1];
    };

    return (
        <GlobalStateContext.Provider value={{ globalState, setGlobalState, getAuthorization, setAuthorization }}>
            {children}
        </GlobalStateContext.Provider>
    );
};