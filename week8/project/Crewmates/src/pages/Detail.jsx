import { useLocation, Link, useNavigate } from "react-router-dom";
import "./Detail.css"
import Card from "../components/Card";
import { supabase } from "../supabaseClient";

function Detail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { name, sus, speed, color, id } = location.state;

    const deleteCrewmate = async () => {
        const { data, error } = await supabase
            .from("crewmates")
            .delete()
            .eq("id", id)
        if (error) {
            console.log("insert error: " + error);
        } else {
            console.log("insert success");
        }
        navigate("/gallery")
    }

    return (
        <div className="detail-container">
            <h1 className="page-title">Crewmate Details</h1>
            <Card
                detailed={true}
                name={name}
                sus={sus}
                speed={speed}
                color={color}
            />
            <Link 
                to="/edit" 
                className="button-link"
                state={{ name, sus, speed, color, id }}
            >
                <button>
                    Edit Crewmate
                </button>
            </Link>
            <br />
            <button 
                className="delete"
                onClick={deleteCrewmate}
            >
                Delete Crewmate
            </button>
        </div>
    )
}

export default Detail