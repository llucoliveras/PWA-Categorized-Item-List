import { useEffect, useState } from "react";
import './Home.css'
import Item from "./Item";
import { useDataNavigatorContext } from "../../components/DataNavigatorContext";
import { Button } from "react-bootstrap";
import NewItemModal from "./NewItemModal";

const Home = ({ savedUserLoginData }) => {
    const {
        setPath,
        setData,
        currentList,
    } = useDataNavigatorContext()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const fetchData = async (fileName) => {
            try {
                const res = await fetch(`./data/${fileName}.json`);
                if (!res.ok) throw new Error("File not found");
                const data = await res.json();
                setData(data)
                setPath([data.id]);
            } catch (err) {
                console.error(err);
            }
        };

        if (savedUserLoginData?.username) {
            fetchData(savedUserLoginData.username);
        }
    }, [savedUserLoginData.username, setPath, setData]);

    const goDeeper = (node) => {
        if (node.items) {
            setPath(prev => [...prev, node.id])
        }
    }

    return (
        <div className="list-container">
            <NewItemModal show={showModal} onClose={() => setShowModal(false)} />
            {!currentList && <div>LOADING DATA...</div>}
            {currentList && currentList.items.map((node) => (
                <Item key={node.id} onClick={() => goDeeper(node)} data={node} style={{ cursor: node.items ? 'pointer' : 'default' }}/>
            ))}
            <Button style={{width: "100%"}} onClick={() => setShowModal(true)}>Add Item</Button>
        </div>
    )
}

export default Home;