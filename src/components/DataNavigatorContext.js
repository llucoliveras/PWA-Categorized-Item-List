import { createContext, useContext, useState } from "react";

const DataNavigatorContext = createContext();

export const DataNavigatorProvider = ({children}) => {
    const [path, setPath] = useState(null)
    const [currentList, setCurrentList] = useState(null)

    return (
        <DataNavigatorContext.Provider value={{
            path,
            setPath,
            currentList,
            setCurrentList,
        }}>
            {children}
        </DataNavigatorContext.Provider>
    )
}

export const useDataNavigatorContext = () => useContext(DataNavigatorContext)