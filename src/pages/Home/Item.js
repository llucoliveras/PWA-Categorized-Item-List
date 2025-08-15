import { Card } from "react-bootstrap"
import './Item.css'

const Item = ({data, onClick}) => {
    return (
        <Card className={`list-item`} onClick={onClick}>
            <Card.Body className="item-content">
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>{data.text}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Item;