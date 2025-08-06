import { useLocation, Link, useNavigate } from "react-router-dom";
import "./PostDetail.css"
import Card from "../components/Card";
import { supabase } from "../supabaseClient";

// view specific posts using Card
// allows edit or deletion of the post
function PostDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, description, imageUrl, mapLink, id } = location.state;

    const deletePost = async () => {
        const { data, error } = await supabase
            .from("crewmates")
            .delete()
            .eq("id", id)
        if (error) {
            console.log("insert error: " + error);
        } else {
            console.log("insert success: " + data);
        }
        navigate("/explore")
    }

    return (
        <div className="detail-container">
            <h1 className="page-title">Post Details</h1>
            <Card
                detailed={true}
                title={title}
                description={description}
                imageUrl={imageUrl}
                mapLink={mapLink}
            />
            <Link 
                to="/edit" 
                className="button-link"
                state={{ title, description, imageUrl, mapLink, id }}
            >
                <button>
                    Edit Post
                </button>
            </Link>
            <br />
            <button 
                className="delete"
                onClick={deletePost}
            >
                Delete Post
            </button>
        </div>
    )
}

export default PostDetail