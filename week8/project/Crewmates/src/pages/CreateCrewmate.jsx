import './CreateCrewmate.css'
import { supabase } from '../supabaseClient.js'
import CrewmateForm from '../components/CrewmateForm.jsx'
import { useNavigate } from 'react-router'

function CreateCrewmate() {
    const navigate = useNavigate()
    const initialValues = {
        name: null,
        sus: false,
        speed: null,
        color: "red"
    }

    const handleFormSubmit = async (formData) => {
        const { data, error } = await supabase
            .from("crewmates")
            .insert([formData])
            .select()
        if (error) {
            console.log("insert error: " + error);
        } else {
            console.log("insert success: " + data);
        }

        navigate("/gallery")
    }

    return (
        <div className='create-container'>
            <h1 className='page-title'>Create a New Crewmate</h1>
            <CrewmateForm
                initialValues={initialValues}
                submitButtonText={"Create Crewmate!"}
                onSubmit={handleFormSubmit}
            />
        </div>
    )
}

export default CreateCrewmate