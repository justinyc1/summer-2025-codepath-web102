import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient.js'
import PostForm from '../components/PostForm.jsx'
import './EditPost.css'

// allows edits for an existing post
function EditPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, description, imageUrl, mapLink, id } = location.state;
    const initialValues = {
        title: title,
        description: description,
        imageUrl: imageUrl,
        mapLink: mapLink
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
        const {title, description, imageUrl, mapLink} = formData
        console.log(title, description, imageUrl, mapLink)
        navigate(`/details/${id}`, {state: {title, description, imageUrl, mapLink, id}})
    }

    return (
        <div className='edit-container'>
            <h1 className='page-title'>Edit Crewmate</h1>
            <PostForm
                initialValues={initialValues}
                submitButtonText={"Edit Crewmate!"}
                onSubmit={handleFormSubmit}
            />
        </div>
    )
}

export default EditPost