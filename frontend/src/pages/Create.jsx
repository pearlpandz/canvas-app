import React from "react";
import CanvasEditor from "../CanvasComponents/CanvasEditor";

const CreatePage = () => {
    return (
        <div style={{ padding: 20 }}>
            <h1>Canvas Editor</h1>
            <CanvasEditor template={null} mode='create' />
        </div>
    );
};

export default CreatePage;
