import { useState } from 'react'
import './CreateCrewmate.css'
// user can: name, select an attribute

function CreateCrewmate() {
    const [selections, setSelections] = new useState({
        name: "",
        sus: false,
        speed: "",
        color: ""
    });
    const colors = ["red", "orange", "yellow", "lime", "green", "cyan", "blue", "purple", "pink", "brown", "white", "black"]

    const updateSelection = (event, attribute) => {
        switch (attribute) {
            case "name":
                setSelections(prevSelections => ({
                    ...prevSelections, [attribute]: event.target.value
                }))
                break
            case "sus":
                setSelections(prevSelections => ({
                    ...prevSelections, [attribute]: !selections.sus 
                }))
                break
            case "speed":
                setSelections(prevSelections => ({
                    ...prevSelections, [attribute]: event.target.value
                }))
                break
        }
        console.log(selections);
    }

    return (
        <div className='create-container'>
            <h1>Create a New Crewmate</h1>
            <div className='selections-container'>
                <div className='name-container'>
                    <h3>Name:</h3>
                    <input 
                        type="text"
                        value={selections.name}
                        onChange={(event) => {updateSelection(event, "name")}}
                    />
                </div>
                <div className='sus-container'>
                    <h3>Impostor?</h3>
                    <input
                        className={selections.sus === true ? "is-sus" : "not-sus"}
                        type="checkbox"
                        checked={selections.sus}
                        onChange={(event) => {updateSelection(event, "sus")}}
                    />
                    <span className={selections.sus === true ? "is-sus" : "not-sus"}>sus</span>
                </div>
                <div className='speed-container'>
                    <h3>Speed {"(mph)"}:</h3>
                    <input 
                        type="text"
                        value={selections.speed}
                        onChange={(event) => {updateSelection(event, "speed")}}
                    />
                </div>
                <div className='color-container'>
                    <h3>Pick a color:</h3>
                    {colors.map((color) => (
                        <div className='color-buttons'>
                            <input 
                                type="radio"
                                color={color}
                                checked={selections.color === color}
                                onClick={() => {setSelections(prevSelections => ({...prevSelections, color: color}))}}
                            />
                            <span>{color}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CreateCrewmate