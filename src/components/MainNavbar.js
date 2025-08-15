import { Button, Container, Navbar } from "react-bootstrap"
import { useDataNavigatorContext } from "./DataNavigatorContext"

const MainNavbar = ({ savedUserLoginData, onLogout }) => {
    const {
        path,
        setPath,
        currentList
    } = useDataNavigatorContext()

    const goBack = () => {
        console.log(path)
        if (path.length > 1) {
            setPath(prev => prev.slice(0, -1))
        }
    }

    return (
        <Navbar bg="light" className="border-bottom">
            <Container
                fluid
                className="d-flex justify-content-between align-items-center"
                style={{ minHeight: '56px' }} // keeps navbar height consistent
            >
                <Button variant="outline-primary" onClick={goBack}>
                    ← Back
                </Button>

                <div className="fw-bold text-center flex-grow-1">
                    {currentList?.name == "root" ? savedUserLoginData.username : currentList?.name}
                </div>

                <Button variant="outline-danger" onClick={onLogout}>
                    Logout
                </Button>
            </Container>
        </Navbar>
    );
}

export default MainNavbar