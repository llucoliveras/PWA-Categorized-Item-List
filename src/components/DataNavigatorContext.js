import { createContext, useContext, useState } from "react"

const DataNavigatorContext = createContext()

export const useDataNavigatorContext = () => useContext(DataNavigatorContext)

export const DataNavigatorProvider = ({ children }) => {
    const [data, setData] = useState(null) // no data until login
    const [path, setPath] = useState([])   // empty path until we know the root

    // Derive currentList if data exists
    const getCurrentList = () => {
        if (!data || path.length === 0) return null

        let current = data
        for (let i = 1; i < path.length; i++) {
            current = current.items.find(item => item.id === path[i])
            if (!current) break
        }
        return current
    }

    const currentList = getCurrentList()

    const addItem = (newItem) => {
        if (!data) return

        setData(prev => {
            const newData = structuredClone(prev)
            let current = newData
            for (let i = 1; i < path.length; i++) {
                current = current.items.find(item => item.id === path[i])
            }
            current.items.push(newItem)
            return newData
        })
    }

    console.log(data, path, currentList)

    return (
        <DataNavigatorContext.Provider
            value={{ data, setData, path, setPath, currentList, addItem }}
        >
            {children}
        </DataNavigatorContext.Provider>
    )
}
