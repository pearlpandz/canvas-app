import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const HomePage = () => {
    const [templates, setTemplates] = useState([]);
    const [images, setImages] = useState([]);

    // useEffect(() => {
    //     // Fetch the templates from the API
    //     const getTemplates = () => {
    //         fetch(`/api/templates`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 setTemplates(data);
    //             });
    //     }

    //     getTemplates();
    // }, []);

    useEffect(() => {
        // Fetch the templates from local storage
        const data = JSON.parse(localStorage.getItem('templates'))
        setTemplates(data);
    }, []);

    useEffect(() => {
        fetch('https://api.unsplash.com/photos/?client_id=xGPW7tpKUYE6kyWR-vOWtpp_ZOUxpAbeH4AdA5Z-tgk')
            .then(res => res.json())
            .then(data => {
                setImages(data);
            });
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>List of Images</h1>
            {
                images?.length > 0 ? (
                    <ul className="image-list">
                        {images?.map((image, index) => (
                            <li key={index}>
                                <div>
                                    <img src={image.urls.small_s3} alt={image.alt_description} style={{ width: 100, height: 100 }} />
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No images available.</p>
                )
            }

            <h1>List of Templates</h1>
            {
                templates?.length > 0 ? (
                    <ul>
                        {templates?.map((template, index) => (
                            <li key={index}>
                                <div>
                                    <img src={template.image} alt={template.name} style={{ width: 100, height: 100 }} />
                                    <p>{template.name}</p>
                                    <Link style={{marginLeft: 10}} to={`/edit/${template.templateId}`}>Edit</Link>
                                    <Link style={{marginLeft: 10}} to={`/preview/${template.templateId}`}>Preview</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No templates available.</p>
                )
            }
        </div>
    );
};

export default HomePage;
