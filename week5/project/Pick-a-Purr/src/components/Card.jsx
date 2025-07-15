import React from "react";

// breed
// weight
// country
// lifespan
// image
const Card = ({ breed, weight, country, lifespan, image, banAttribute }) => {
    return (
        <div>
            <img className="cat-image" src={image} />
            <div className="buttons">
                <button onClick={() => {banAttribute("breed", breed)}}>{breed}</button>
                <button onClick={() => {banAttribute("weight", weight)}}>{weight} lbs</button>
                <button onClick={() => {banAttribute("origin", country)}}>{country}</button>
                <button onClick={() => {banAttribute("lifespan", lifespan)}}>{lifespan} years </button>
            </div>
        </div>
    )
}

export default Card;