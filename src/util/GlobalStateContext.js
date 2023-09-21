// 해당 파일은 storage 방식으로 변경함으로써 더 이상 필요 없으나 공부 자료로 남겨둠
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
        encryptoAccessToken: '',
    });

    const getAuthorization = () => {
        return `${globalState.grantType} ${globalState.encryptoAccessToken}`;
    };
    
    const setAuthorization = (newAccessToken) => {
        globalState.grantType = newAccessToken.split(' ')[0];
        globalState.encryptoAccessToken = newAccessToken.split(' ')[1];
    };

    return (
        <GlobalStateContext.Provider value={{ globalState, setGlobalState, getAuthorization, setAuthorization }}>
            {children}
        </GlobalStateContext.Provider>
    );
};