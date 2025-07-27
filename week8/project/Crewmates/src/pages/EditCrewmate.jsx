import { useLocation, useNavigate } from "react-router-dom";
import './EditCrewmate.css'
import { supabase } from '../supabaseClient.js'
import CrewmateForm from '../components/CrewmateForm.jsx'

function EditCrewmate() {
    const navigate = useNavigate();
    const location = useLocation();
    const { name, sus, speed, color, id } = location.state;
    const initialValues = {
        name: name,
        sus: sus,
        speed: speed,
        color: color
    }

    const handleFormSubmit = async (formData) => {
        const { data, error } = await supabase
            .from("crewmates")
            .update([formData])
            .eq("id", id)
            .select()
        if (error) {
            console.log("insert error: " + error);
        } else {
            console.log("insert success");
        }
        const {name, sus, speed, color} = formData
        console.log(name, sus, speed, color)
        navigate(`/details/${id}`, {state: {name, sus, speed, color, id}})
    }

    return (
        <div className='edit-container'>
            <h1 className='page-title'>Edit Crewmate</h1>
            <CrewmateForm
                initialValues={initialValues}
                submitButtonText={"Edit Crewmate!"}
                onSubmit={handleFormSubmit}
            />
        </div>
    )
}

export default EditCrewmate