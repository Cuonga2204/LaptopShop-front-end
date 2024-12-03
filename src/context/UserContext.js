import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [triggerFetch, setTriggerFetch] = useState(false);

    return (
        <UserContext.Provider value={{ triggerFetch, setTriggerFetch }}>
            {children}
        </UserContext.Provider>
    );
};