import { useState } from "react";
import "./Card.css"

const Card = (props) => {
  const {detailed, name, sus, speed, color} = props

  if (detailed) {
    return (
      <div className="card-container detailed">
          <h2 className={sus === true ? "color-impostor" : "color-crewmate"}>
              {sus === true ? "Impostor" : "Crewmate"}
          </h2>
          <img src={`/crewmates/${color}.webp`}/>
          <h2 className="name">{name}</h2>
          <h4 className="speed">{speed + " mph"}</h4>
      </div>
    )
  } else {
    return (
      <div className="card-container simple">
          <img src={`/crewmates/${color}.webp`}/>
          <h2 className={sus === true ? "color-impostor" : "color-crewmate"}>{name}</h2>
      </div>
    )
  }
}

export default Card