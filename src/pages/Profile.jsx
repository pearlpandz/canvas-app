import { useEffect, useState } from "react";
import Form from "../components/Form";

function Profile() {
    const [companyDetails, setCompanyDetails] = useState({});
    console.log('test')

    useEffect(() => {
        const data = localStorage.getItem("companyDetails");
        if (data) {
            setCompanyDetails(JSON.parse(data));
        }
    }, []);

    return (
        <div>
            <h1>Profile Page</h1>
            <Form 
                companyDetails={companyDetails} 
                setCompanyDetails={setCompanyDetails}
            />
        </div>
    );
}

export default Profile