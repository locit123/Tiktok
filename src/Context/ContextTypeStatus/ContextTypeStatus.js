import { useState, createContext } from 'react';

export const TypeContextProvider = createContext();

const ContextTypeStatus = ({ children }) => {
    const [typeStatus, setTypeStatus] = useState(null);

    const values = {
        typeStatus,
        setTypeStatus,
    };
    return <TypeContextProvider.Provider value={values}>{children}</TypeContextProvider.Provider>;
};

export default ContextTypeStatus;
