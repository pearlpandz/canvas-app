import { useState } from "react";
import './Form.css';

export default function Form(props) {
    const { setCompanyDetails, companyDetails } = props;
    const [formData, setFormData] = useState(companyDetails || {
        logo: "", // Logo URL
        companyName: "",
        mobileNumber1: "",
        mobileNumber2: "",
        email: "",
        website: "",
        description: ""
    });

    // Handle File Uploads
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setFormData((prev) => ({ ...prev, logo: e.target.result }));
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem("companyDetails", JSON.stringify(formData));
        setCompanyDetails(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label htmlFor="logoUpload" className="form-label">Upload Logo:</label>
                <input
                    id="logoUpload"
                    type="file"
                    onChange={handleImageUpload}
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="companyName" className="form-label">Company Name:</label>
                <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter Company Name"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="mobileNumber1" className="form-label">Mobile Number:</label>
                <input
                    id="mobileNumber1"
                    name="mobileNumber1"
                    type="text"
                    value={formData.mobileNumber1}
                    onChange={handleChange}
                    placeholder="Enter Contact Details"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="mobileNumber2" className="form-label">Alternate Mobile Number (Optional):</label>
                <input
                    id="mobileNumber2"
                    name="mobileNumber2"
                    type="text"
                    value={formData.mobileNumber2}
                    onChange={handleChange}
                    placeholder="Enter Contact Details"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address:</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Contact Details"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="website" className="form-label">Website:</label>
                <input
                    id="website"
                    name="website"
                    type="text"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="Enter Contact Details"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter Description"
                    className="form-input"
                    rows={4}
                />
            </div>

            <button type="submit" className="form-button">Submit</button>
        </form>
    );
}