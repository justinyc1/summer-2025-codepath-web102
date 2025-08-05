import { useNavigate } from 'react-router'
import { supabase } from '../supabaseClient.js'
import './CreatePost.css'
import PostForm from '../components/PostForm.jsx'

// allows creation of a post
function CreatePost() {
    const navigate = useNavigate()
    const initialValues = {
        title: null,
        description: null,
        imageUrl: null,
        mapLink: null
    }

    const handleFormSubmit = async (formData) => {
        const { data, error } = await supabase
            .from("posts")
            .insert([formData])
            .select("id", "created_at", "title", "description", "image_url", "map_link") // DEBUG TODO: try to nav to post/:id instead of explore
        if (error) {
            console.log("insert error: " + error);
        } else {
            console.log("insert success: " + data);
        }

        navigate("/explore")
    }

    return (
        <div className='create-container'>
            <h1 className='page-title'>Create a New Post</h1>
            <PostForm
                initialValues={initialValues}
                submitButtonText={"Create Post!"}
                onSubmit={handleFormSubmit}
            />
        </div>
    )
}

export default CreatePost