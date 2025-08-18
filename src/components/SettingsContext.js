import { createContext, useContext, useState, useEffect } from "react"

const SettingsContext = createContext()

export const useSettings = () => useContext(SettingsContext)

export const SettingsProvider = ({ children }) => {
    const [theme, setTheme] = useState("light")
    const [fontSize, setFontSize] = useState("medium")

    // Load saved settings from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        const savedFontSize = localStorage.getItem("fontSize")
        if (savedTheme) setTheme(savedTheme)
        if (savedFontSize) setFontSize(savedFontSize)
    }, [])

    // Save to localStorage whenever settings change
    useEffect(() => {
        localStorage.setItem("theme", theme)
        localStorage.setItem("fontSize", fontSize)
    }, [theme, fontSize])

    return (
        <SettingsContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
            {children}
        </SettingsContext.Provider>
    )
}
