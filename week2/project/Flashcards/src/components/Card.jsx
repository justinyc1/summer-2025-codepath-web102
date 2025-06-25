import React from "react";

// flipped
// front
// back
// difficulty
const Card = (props) => {

    if (!props.flipped) { // not flipped
        return (
            <div className="front">
                <h3>{props.front}</h3>
                {props.img !== null && <img src={props.img} />}
            </div>
        )
    } else {
        return (
            <div className="back">
                {/* <img src={props.imageUrl} /> */}
                <h3>{props.back}</h3>
            </div>
        )
    }
}

export default Card;