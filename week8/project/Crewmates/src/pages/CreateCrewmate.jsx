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
                setSelections({...prevSelections, [attribute]: event.target.value})
                break
            case "sus":

                break
            case "speed":

                break
            case "color":

                break
        }
    }

    return (
        <div className='create-container'>
            <h1>Create a New Crewmate</h1>
            <div className='selections-container'>
                <div className='name-container'>
                    Name:
                    <input 
                        type="text"
                        value={selections.name}
                        onChange={(event) => {updateSelection(event, "name")}}
                    />
                </div>
                <div className='sus-container'>

                </div>
                <div className='speed-container'>
                    Speed {"(mph)"}:
                    <input 
                        type="text"
                        value={selections.speed}
                        onChange={(event) => {updateSelection(event, "speed")}}
                    />
                </div>
                <div className='color-container'>

                </div>
            </div>
        </div>
    )
}

export default CreateCrewmate