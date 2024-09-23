import React, { useState } from 'react';
import { ContextProvider } from './Provider';

const Context = ({ children }) => {
    const [typeModal, setTypeModal] = useState('');

    const values = { typeModal, setTypeModal };
    return <ContextProvider.Provider value={values}>{children}</ContextProvider.Provider>;
};

export default Context;
