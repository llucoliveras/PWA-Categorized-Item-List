import { Card } from "react-bootstrap"
import './Item.css'
import { ChevronRight } from "react-bootstrap-icons";

const Item = ({data, onClick, style}) => {
    return (
        <Card style={style} className={`list-item`} onClick={onClick}>
            <Card.Body className="item-content">
                <div>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>{data.description}</Card.Text>
                </div>
                {data.items && data.items?.length > 0 && (
                    <ChevronRight size={20} className="text-muted" style={{ marginLeft: "16px"}} />
                )}
            </Card.Body>
        </Card>
    )
}

export default Item;