import { useEffect, useState } from "react"
import { Link } from "react-router";
import "./Gallery.css"
import { supabase } from "../supabaseClient"
import Card from "../components/Card";

function Gallery() {
    const [crewmates, setCrewmates] = useState(null);

    useEffect(() => {
        const fetchAllCrewmates = async () => {
            const { data, error } = await supabase
                .from("crewmates")
                // .select('id, created_at, name, sus, speed, color')
                .select()
                .order('created_at', { ascending: false })

            setCrewmates(data)
        }
        fetchAllCrewmates()
    }, [])

    return (
        <div className="gallery-container">
            <h1 className="page-title">Crewmate Gallery</h1>
            <div className="results-container">
                {crewmates === null ? "Loading..." : crewmates.map(({name, sus, speed, color, id}) => (
                    <Link 
                        to={`/details/${id}`}
                        className="result"
                        key={id}
                        state={{ name, sus, speed, color, id }}
                    >
                        <Card
                            detailed={false}
                            name={name}
                            sus={sus}
                            speed={speed}
                            color={color}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Gallery