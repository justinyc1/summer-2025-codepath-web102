import { useSearchParams } from "react-router"
import { useState } from "react"
import { supabase } from "../supabaseClient"
import "./Card.css"

// display a post, including:
// - title
// - content
// - image
// - comments
// - like button & count
const Card = (props) => {
const {detailed, title, description, imageUrl, mapLink, createdAt, upvotes} = props
const [upvoteCount, setUpvoteCount] = useState(upvotes)

const incrementUpvotes = async () => {
    const newUpvoteCount = upvoteCount + 1
    setUpvoteCount(newUpvoteCount)
    const { data, error } = await supabase
        .from("posts")
        .update("upvotes", newUpvoteCount)
        .select()
    
    if (error) {
        console.log("insert error: " + error);
    } else {
        console.log("insert success: " + data);
    }
}

if (detailed) {
    return (
    <div className="card-container detailed">
        <h2>{title}</h2>
        <h4>{"Posted on " + createdAt.toLocalString("en-US")}</h4>
        {description !== null && <h3>{description}</h3>}
        {imageUrl !== null && <img src={imageUrl}/>}
        {mapLink !== null && <h3>{mapLink}</h3>}
        <div className="upvotes-container">
            <img 
                onClick={incrementUpvotes}
                src={"/vite.svg"} // TODO; update img & CSS
            />
            Upvotes
        </div>
    </div>
    )
} else {
    return (
    <div className="card-container simple">
        <h2>{title}</h2>
        <h4>{"Posted on " + createdAt.toLocalString("en-US")}</h4>
        <div className="upvotes-container">
            <img 
                onClick={incrementUpvotes}
                // src={}
            />
            Upvotes
        </div>
    </div>
    )
}
}

export default Card