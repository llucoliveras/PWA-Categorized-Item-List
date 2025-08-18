import { Modal, Button, Form, FloatingLabel } from "react-bootstrap"
import { useState } from "react"
import { useDataNavigatorContext } from "../../components/DataNavigatorContext"

const NewItemModal = ({ show, onClose }) => {
    const [name, setName] = useState("")
    const [nameHasChangedAtLeastOnce, setNameHasChangedAtLeastOnce] = useState(false)
    const [description, setDescription] = useState("")
    const [hasItemsInside, setHasItemsInside] = useState(false)
    const { addItem } = useDataNavigatorContext()

    const handleSave = () => {
        let newItem = {
            id: Date.now().toString(),
            name: name
        }
        if (description && description.length > 0) newItem.text = description
        if (hasItemsInside) newItem.items = []
        addItem(newItem)
        handleClose()
    }

    const handleClose = () => {
        setName(null)
        setDescription(null)
        setHasItemsInside(null)
        onClose()
    }

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <FloatingLabel
                        controlId="newItemName"
                        label="Name*"
                        className="mb-3"
                    >
                        <Form.Control
                            isInvalid={nameHasChangedAtLeastOnce && name.length === 0}
                            as="textarea"
                            value={name}
                            onChange={(e) => {
                                if (!nameHasChangedAtLeastOnce)
                                    setNameHasChangedAtLeastOnce(true)
                                setName(e.target.value)
                            }}
                            placeholder="Enter the name here" required={true}
                        />
                        {nameHasChangedAtLeastOnce && name.length === 0 &&
                            <Form.Text
                                style={{color: "red", fontStyle: "italic"}}
                            >
                                You need to input a valid name
                            </Form.Text>
                        }
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="newItemDescription"
                        label="Description"
                        className="mb-3"
                    >
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter the description here"
                        />
                    </FloatingLabel>

                    <Form.Check
                        type="checkbox"
                        id="newItemHasItemsInside"
                        label="Has items inside?"
                        value={hasItemsInside}
                        onChange={(e) => setHasItemsInside(e.target.value)}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={name === null || name.length === 0}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewItemModal
