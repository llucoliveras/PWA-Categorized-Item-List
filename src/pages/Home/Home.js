import { useEffect } from "react";
import './Home.css'
import Item from "./Item";
import { useDataNavigatorContext } from "../../components/DataNavigatorContext";

const Home = ({ savedUserLoginData }) => {
    const {
        path,
        setPath,
        currentList,
        setCurrentList,
    } = useDataNavigatorContext()

    useEffect(() => {
        const fetchData = async (fileName) => {
            try {
                const res = await fetch(`./data/${fileName}.json`);
                if (!res.ok) throw new Error("File not found");
                const data = await res.json();
                setPath([data]);
            } catch (err) {
                console.error(err);
            }
        };

        if (savedUserLoginData?.username) {
            fetchData(savedUserLoginData.username);
        }
    }, [savedUserLoginData.username, setPath]);

    useEffect(() => {
        if (!path) return

        if (path.length >= 1) {
            setCurrentList(path[path.length - 1])
        }
    }, [path, currentList, setCurrentList])

    const goDeeper = (node) => {
        if (node.items) {
            setPath(prev => [...prev, node])
        }
    }

    return (
        <div className="list-container">
            {path == null && <div>LOADING DATA...</div>}
            {path != null && currentList != null && currentList.items.map((node) => (
                <Item key={node.id} onClick={() => goDeeper(node)} data={node} style={{ cursor: node.items ? 'pointer' : 'default' }}/>
            ))}
        </div>
    )
}

export default Home;