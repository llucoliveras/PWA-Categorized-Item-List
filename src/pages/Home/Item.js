import { Card } from "react-bootstrap"
import './Item.css'

const Item = ({data, onClick}) => {
    return (
        <Card  className={`list-item center-title`} onClick={onClick}>
            <Card.Body className="item-content">
                {data?.id && data?.related_name
                    ? <>
                        <Card.Title>{data.id} {data.related_name}</Card.Title>
                        <Card.Text>{data.text}</Card.Text>
                    </>
                    : <>
                        <Card.Title>{data.name}</Card.Title>
                    </>
                }
            </Card.Body>
        </Card>
    )
}

export default Item;