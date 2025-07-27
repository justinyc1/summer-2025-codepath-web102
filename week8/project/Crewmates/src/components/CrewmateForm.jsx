import { useState } from 'react'
import './CrewmateForm.css'

function CrewmateForm({ initialValues, submitButtonText, onSubmit }) {
    const [selections, setSelections] = useState(initialValues);
    const colors = ["red", "orange", "yellow", "lime", "green", "cyan", "blue", "purple", "pink", "brown", "white", "black"]

    const handleChange = (event, attribute) => {
        switch (attribute) {
            case "name":
                setSelections(prev => ({
                    ...prev, [attribute]: event.target.value
                }))
                break
            case "sus":
                setSelections(prev => ({
                    ...prev, [attribute]: !selections.sus 
                }))
                break
            case "speed":
                setSelections(prev => ({
                    ...prev, [attribute]: event.target.value
                }))
                break
        }
        console.log(selections);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(selections);
    }

    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <div className='preview-container'>
                {selections.color !== "" && <img src={`/crewmates/${selections.color}.webp`}/>}
            </div>
            <div className='selections-container'>
                <div className='name-container'>
                    <h3>Name:</h3>
                    <input 
                        type="text"
                        value={selections.name}
                        placeholder="Enter name..."
                        onChange={(event) => {handleChange(event, "name")}}
                    />
                </div>
                <div className='sus-container'>
                    <h3>Impostor?</h3>
                    <input
                        className={selections.sus === true ? "is-sus" : "not-sus"}
                        type="checkbox"
                        checked={selections.sus}
                        onChange={(event) => {handleChange(event, "sus")}}
                    />
                    <span className={selections.sus === true ? "is-sus" : "not-sus"}>sus</span>
                </div>
                <div className='speed-container'>
                    <h3>Speed {"(mph)"}:</h3>
                    <input 
                        type="number"
                        value={selections.speed}
                        placeholder="Enter speed..."
                        onChange={(event) => {handleChange(event, "speed")}}
                    />
                </div>
                <div className='color-container'>
                    <h3>Pick a color:</h3>
                    {colors.map((color) => (
                        <div className='color-buttons' key={color}>
                            <input
                                type="radio"
                                name="color"
                                color={color}
                                checked={selections.color === color}
                                onChange={() => {setSelections(prev => ({...prev, color: color}))}}
                            />
                            <span>{color}</span>
                        </div>
                    ))}
                </div>
            </div>
            <button type="submit">{submitButtonText}</button>
        </form>
    )
}

export default CrewmateForm