import { useState } from 'react'
import './PostForm.css'

// requires title
// option to add:
// - additional text content
// - image as an additional url
// - link to place in google maps
function PostForm({ initialValues, submitButtonText, onSubmit }) {
    const [selections, setSelections] = useState(initialValues);
    const [inputErrors, setInputErrors] = useState({
        title: null,
        description: null,
        imageUrl: null,
        mapLink: null
    });

    const handleChange = (event, attribute) => {
        setSelections(prev => ({
            ...prev, [attribute]: event.target.value
        }))
        if (attribute === "title" || selections.title === null || selections.title === "") {
            setInputErrors(prev => ({
                ...prev, title: null
            }))
        }
        console.log(inputErrors); // DEBUG: empty title submit -> type something and delete -> submit but it goes through when shouldnt
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selections.title === null) {
            setInputErrors(prev => ({
                ...prev, title: "A title is required."
            }));
            return;
        }
        onSubmit(selections);
    }

    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <div className='selections-container'>
                <h3>Title:</h3>
                <input 
                    className={inputErrors.title ? "input-error" : ""}
                    type="text"
                    value={selections.title}
                    placeholder={inputErrors.title ? inputErrors.title : "Enter name..."}
                    onChange={(event) => {handleChange(event, "title")}}
                />
                {/* {inputErrors.title && <p className='error'>{inputErrors.title}</p>} */}
                <h3>Description:</h3>
                <input 
                    type="text"
                    value={selections.description}
                    placeholder="Enter description..."
                    onChange={(event) => {handleChange(event, "description")}}
                />
                <h3>Image Url:</h3>
                <input 
                    type="url"
                    value={selections.imageUrl}
                    placeholder="Enter Image Url..."
                    onChange={(event) => {handleChange(event, "imageUrl")}}
                />
                <h3>Map Link:</h3>
                <input 
                    type="url"
                    value={selections.mapLink}
                    placeholder="Enter a maps link..."
                    onChange={(event) => {handleChange(event, "mapLink")}}
                />
            </div>
            <button type="submit">{submitButtonText}</button>
        </form>
    )
}

export default PostForm