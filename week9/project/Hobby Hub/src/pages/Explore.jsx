import { useEffect, useState, useMemo } from "react"
import { Link } from "react-router";
import "./Explore.css"
import { supabase } from "../supabaseClient.js"
import Card from "../components/Card";

// displays all posts
// each item shows creation time, title, and upvotes count
// clicking a post would open view in new page

// can sort by most upvotes or most recent
// can search posts by title
function Explore() {
    const [posts, setPosts] = useState(null)
    const [filter, setFilter] = useState("most recent")
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchAllPosts = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select()
                .order('created_at', { ascending: false })

            if (error) {
                console.log("fetch posts error: " + error);
            } else {
                console.log("fetch posts success!");
                // console.log("fetch posts success: " + data);
            }

            setPosts(data)
        }
        fetchAllPosts()
    }, [])

    const displayPosts = useMemo(() => {
        if (!posts) return null;

        let filtered = posts;
        if (search && search.trim().length > 0) {
            const query = search.trim().toLowerCase();
            filtered = posts.filter(post =>
                post.title && post.title.toLowerCase().includes(query)
            );
        }

        if (filter === "most recent") {
            filtered = [...filtered].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } else if (filter === "most upvotes") {
            filtered = [...filtered].sort((a, b) => b.upvotes - a.upvotes);
        }

        return filtered;
    }, [posts, search, filter]);

    return (
        <div className="explore-container">
            <h1 className="page-title">Explore Spots</h1>
            <div className="filter-container">
                <span>Search by title: </span>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <span className="filter-gap"/>
                <span>Filter by: </span>
                <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value={"most recent"}>Most Recent</option>
                    <option value={"most upvotes"}>Most Upvotes</option>
                </select>
            </div>
            {/* <div className="results-container">
                {posts === null ? "Loading..." : posts.map(({title, description, image_url, map_link, upvotes, created_at, id}) => (
                    <Link 
                        to={`/post/${id}`}
                        className="result"
                        key={id}
                        state={{ title, description, image_url, map_link, upvotes, created_at, id }}
                    >
                        <Card
                            detailed={false}
                            id={id}
                        />
                    </Link>
                ))}
            </div> */}
            <div className="results-container">
                {displayPosts === null ? "Loading..." :
                    displayPosts.length === 0 ? "No results" :
                    displayPosts.map(({title, description, image_url, map_link, upvotes, created_at, id}) => (
                <Link 
                    to={`/post/${id}`}
                    className="result"
                    key={id}
                    state={{ title, description, image_url, map_link, upvotes, created_at, id }}
                >
                    <Card
                        detailed={false}
                        id={id}
                    />
                </Link>
                ))}
            </div>
        </div>
    )
}

export default Explore