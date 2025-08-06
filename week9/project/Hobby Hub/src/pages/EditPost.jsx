import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient.js'
import PostForm from '../components/PostForm.jsx'
import './EditPost.css'

// allows edits for an existing post
function EditPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, description, image_url, map_link, id } = location.state;
    const initialValues = {
        title: title,
        description: description,
        image_url: image_url,
        map_link: map_link
    }   

    const handleFormSubmit = async (formData) => {
        const { data, error } = await supabase
            .from("posts")
            .update([formData])
            .eq("id", id)
            .select()
        if (error) {
            console.log("insert error: " + error);
        } else {
            console.log("insert success: " + data);
        }
        const {title, description, image_url, map_link} = formData
        console.log(title, description, image_url, map_link)
        navigate(`/post/${id}`, {state: {title, description, image_url, map_link, id}})
    }

    return (
        <div className='edit-container'>
            <h1 className='page-title'>Edit Post</h1>
            <PostForm
                initialValues={initialValues}
                submitButtonText={"Apply Edits"}
                onSubmit={handleFormSubmit}
            />
        </div>
    )
}

export default EditPost