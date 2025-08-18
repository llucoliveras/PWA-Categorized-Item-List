import { Modal, Button, Form } from "react-bootstrap"
import { useSettings } from "./SettingsContext.js"
import { useState } from "react"

const SettingsModal = ({ show, onClose }) => {
    const { theme, setTheme, fontSize, setFontSize } = useSettings()
    const [tempTheme, setTempTheme] = useState(theme)
    const [tempFontSize, setTempFontSize] = useState(fontSize)

    const handleSave = () => {
        setTheme(tempTheme)
        setFontSize(tempFontSize)
        onClose()
    }

    const handleClose = () => {
        onClose()
        setTempTheme(theme)
        setTempFontSize(fontSize)
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Theme Selector */}
                    <Form.Group className="mb-3" controlId="settingsTheme">
                        <Form.Label>Theme</Form.Label>
                        <Form.Select
                            value={tempTheme}
                            onChange={(e) => setTempTheme(e.target.value)}
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </Form.Select>
                    </Form.Group>

                    {/* Font Size Selector */}
                    <Form.Group className="mb-3" controlId="settingsFontSize">
                        <Form.Label>Font Size</Form.Label>
                        <Form.Select
                            value={tempFontSize}
                            onChange={(e) => setTempFontSize(e.target.value)}
                        >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SettingsModal
