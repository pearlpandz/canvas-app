import React from "react";
import CanvasRenderer from "../components/CanvasRenderer";

const PreviewPage = () => {

    const businessDetails = JSON.parse(localStorage.getItem('companyDetails')) ?? {}

    return (
        <div style={{ padding: 20 }}>
            <h1>Load existing template and bind business details</h1>
            <CanvasRenderer businessDetails={businessDetails} />
        </div>
    );
};

export default PreviewPage;
