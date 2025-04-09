import React, { useEffect, useState } from "react";
import CanvasRenderer from "../CanvasComponents/CanvasRenderer";
import { useParams } from "react-router";

const PreviewPage = () => {
    const businessDetails = JSON.parse(localStorage.getItem('companyDetails')) ?? {}
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
            <h1>Canvas Preview :: Load existing template and bind business details</h1>
            <CanvasRenderer template={template} businessDetails={businessDetails} />
        </div>
    );
};

export default PreviewPage;
