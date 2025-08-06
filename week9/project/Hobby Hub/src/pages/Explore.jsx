import { useEffect, useState } from "react"
import { Link } from "react-router";
import "./Explore.css"
import { supabase } from "../supabaseClient"
import Card from "../components/Card";

// displays all posts
// each item shows creation time, title, and upvotes count
// clicking a post would open view in new page

// can sort by most upvotes or most recent
// can search posts by title
function Explore() {
    const [posts, setPosts] = useState(null)
    const [filterOrder, setFilterOrder] = useState("recent") // TODO implement button & sort

    useEffect(() => {
        const fetchAllPosts = async () => {
            const { data, error } = await supabase
                .from("posts")
                // .select('id, created_at, name, sus, speed, color')
                .select()
                .order('created_at', { ascending: false })

            if (error) {
                console.log("insert error: " + error);
            } else {
                console.log("insert success: " + data);
            }

            setPosts(data)
        }
        fetchAllPosts()
    }, [])

    return (
        <div className="explore-container">
            <h1 className="page-title">Explore Spots</h1>
            <div className="results-container">
                {posts === null ? "Loading..." : posts.map(({createdAt, title, upvotes, id}) => (
                    <Link 
                        to={`/details/${id}`}
                        className="result"
                        key={id}
                        state={{ createdAt, title, upvotes, id }}
                    >
                        <Card
                            detailed={false}
                            createdAt={createdAt}
                            title={title}
                            upvotes={upvotes}
                            id={id}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Explore