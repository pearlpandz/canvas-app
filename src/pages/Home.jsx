import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Modal from "../components/Modal";
import Editor from "../components/Editor";

const HomePage = () => {
    const [images, setImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);

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
        fetch('https://api.unsplash.com/photos/?client_id=xGPW7tpKUYE6kyWR-vOWtpp_ZOUxpAbeH4AdA5Z-tgk')
            .then(res => res.json())
            .then(data => {
                setImages(data);
            });
    }, []);

    const handleSelectedImg = (img) => {
        setSelectedImg(img);
        setShowModal(true);
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>List of Images</h1>
            {
                images?.length > 0 ? (
                    <ul className="image-list">
                        {images?.map((image, index) => (
                            <li key={index} onClick={() => handleSelectedImg(image)} style={{ cursor: 'pointer' }}>
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


            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Editor selectedImg={selectedImg} />
            </Modal>
        </div>
    );
};

export default HomePage;
