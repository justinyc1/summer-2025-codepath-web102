import { useSearchParams } from "react-router"
import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient.js"
import "./Card.css"

// display a post, including:
// - title
// - content
// - image
// - comments
// - like button & count
const Card = (props) => {
const {detailed, id} = props
const [postData, setPostData] = useState({
    description: null,
    image_url: null,
    map_link: null,
    upvotes: null,
    created_at: null,
})

useEffect(() => {
    const fetchData = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select()
            .eq("id", id)
        setPostData({ ...data[0] })
    }

    fetchData()
}, [])

const incrementUpvotes = async () => {
    const newUpvoteCount = postData.upvotes + 1
    setPostData(prev => ({
        ...prev, upvotes: newUpvoteCount
    }))
    const { data, error } = await supabase
        .from("posts")
        .update({ upvotes: newUpvoteCount })
        .eq('id', id)
        .select()
    
    if (error) {
        console.log("fetch upvotes error: " + error);
    } else {
        console.log("fetch upvotes success!" + data);
        // console.log("fetch upvotes success: " + data);
    }
}

// console.log(created_at) // DEBUG

const formatTime = (isoString) => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0'); // 24-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const am = Number(hours) < 12;

    return `${year}/${month}/${day} ${hours > 12 ? hours % 12 : hours}:${minutes}:${seconds} ${am ? "AM" : "PM"}`;
}

if (detailed) {
    return (
    <div className="card-container detailed">
        <div className="title-container">
            <h2>{postData.title}</h2>
            <h4>{"Posted on " + formatTime(postData.created_at)}</h4>
        </div>
        {postData.description !== null && <p>{postData.description}</p>}
        {postData.image_url !== null && <img className="url-image" src={postData.image_url}/>}
        {postData.map_link !== null && <div className="map-link">
            <span>Map Link: </span>
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">{postData.map_link}</a>
        </div>}
        <div className="upvotes-container">
            <img 
                className="shrink-pop"
                onClick={incrementUpvotes}
                src={"/like.png"}
            />
            {postData.upvotes} Upvotes
        </div>
    </div>
    )
} else {
    return (
    <div className="card-container simple">
        <h2>{postData.title}</h2>
        <h4>{"Posted on " + formatTime(postData.created_at)}</h4>
        <div className="upvotes-left-container">
            {postData.upvotes} Upvotes
        </div>
    </div>
    )
}
}

export default Card