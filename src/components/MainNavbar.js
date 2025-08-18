import { Button, Container, Navbar, NavDropdown } from "react-bootstrap"
import { useDataNavigatorContext } from "./DataNavigatorContext"
import { useState } from "react"
import SettingsModal from "./SettingsModal"
import { PersonCircle } from "react-bootstrap-icons" // Bootstrap icon

const MainNavbar = ({ savedUserLoginData, onLogout }) => {
    const { path, setPath, currentList } = useDataNavigatorContext()
    const [showSettings, setShowSettings] = useState(false)

    const goBack = () => {
        if (path.length > 1) {
            setPath(prev => prev.slice(0, -1))
        }
    }

    return (
        <Navbar bg="light" className="border-bottom">
            <Container
                fluid
                className="d-flex justify-content-between align-items-center"
                style={{ minHeight: "56px" }}
            >
                <Button variant="outline-primary" onClick={goBack}>
                    ← Back
                </Button>

                <div className="fw-bold text-center flex-grow-1">
                    {currentList?.name === "root"
                        ? savedUserLoginData.username
                        : currentList?.name}
                </div>

                <NavDropdown
                    align="end"
                    title={<PersonCircle size={28} />} // icon instead of text
                    id="user-dropdown"
                >
                    <NavDropdown.Header>
                        {savedUserLoginData?.username}
                    </NavDropdown.Header>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => setShowSettings(true)}>
                        ⚙ Settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={onLogout}>
                        🚪 Logout
                    </NavDropdown.Item>
                </NavDropdown>
            </Container>

            <SettingsModal show={showSettings} onClose={() => setShowSettings(false)} />
        </Navbar>
    )
}

export default MainNavbar