import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [account, setAccount] = useState({ 'firstname': " ", 'username': " " , 'email': " ",'lastname': " ", "otp": ""});
    return (
        <DataContext.Provider value={{
            account,
            setAccount,
        }}>
            {children}
        </DataContext.Provider>
    )
}
