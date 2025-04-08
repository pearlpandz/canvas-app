import React, { useEffect, useState } from "react";
import CanvasEditor from "../components/CanvasEditor";
import { useParams } from "react-router";

const EditPage = () => {
    const { templateId } = useParams();
    const [template, setTemplate] = useState({});

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('templates')) || [];
        const template = data.find(template => template.templateId == templateId);
        console.log(template);
        setTemplate(template);
    }, [templateId]);

    return (
        <div style={{ padding: 20 }}>
            <h1>Canvas Editor</h1>
            <CanvasEditor template={template} mode='edit' />
        </div>
    );
};

export default EditPage;
