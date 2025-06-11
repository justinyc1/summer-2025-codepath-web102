import React from "react";

// title
// description
// imageUrl
// buttonUrl
const Card = (props) => {
    return (
        <td>
            <img src={props.imageUrl} />
            <h2>{props.title}</h2>
            <h5>{props.description}</h5>
            <button onClick={() => window.open(props.buttonUrl, '_blank')}>Learn More</button>
        </td>
    )
}

export default Card;