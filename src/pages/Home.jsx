
import React, { useState } from "react";
import List from "../components/List";
import Modal from "../components/Modal";
import Editor from "../components/Editor";

const CanvasRenderer = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);

    const handleSelectedImg = (img) => {
        setSelectedImg(img);
        setShowModal(true);
    }

    return (
        <div style={{padding: 20}}>
            <List setSelectedImg={handleSelectedImg} />

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Editor selectedImg={selectedImg}/>
            </Modal>

        </div>
    );
};

export default CanvasRenderer;
