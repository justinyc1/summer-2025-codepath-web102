import { useLocation, Link, useNavigate } from "react-router-dom";
import "./PostDetail.css"
import Card from "../components/Card";
import { supabase } from "../supabaseClient.js";

// view specific posts using Card
// allows edit or deletion of the post
function PostDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, description, image_url, map_link, upvotes, created_at, id } = location.state;

    const deletePost = async () => {
        const { data, error } = await supabase
            .from("posts")
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
                image_url={image_url}
                map_link={map_link}
                upvotes={upvotes}
                created_at={created_at}
                id={id}
            />
            <Link 
                to={`/edit/${id}`} 
                className="button-link"
                state={{ title, description, image_url, map_link, id }}
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