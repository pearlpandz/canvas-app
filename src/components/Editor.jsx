import React, { useEffect, useMemo, useState } from "react";
import './Editor.css';
import CanvasRenderer from "../CanvasComponents/CanvasRenderer";
import { SIDEBAR } from "../constants";

function Editor(props) {
    const { selectedImg } = props;
    const [selectedTemplate, setSelectedTemplate] = useState();
    const [templates, setTemplates] = useState([]);
    const [selectedSidebar, setSelectedSidebar] = useState(SIDEBAR[0].key)
    const [selectedTheme, setSelectedTheme] = useState({color: 'red', background: '#fff'})
    const businessDetails = JSON.parse(localStorage.getItem('companyDetails')) ?? {}

    useEffect(() => {
        // Fetch the templates from local storage
        const data = JSON.parse(localStorage.getItem('templates'))
        setTemplates(data);
        setSelectedTemplate(data[1]);
    }, []);

    const framesContainer = useMemo(() => {
        return (
            <div className="frame-container">
                <div className="frames">
                    {
                        templates.map((template, index) => (
                            <button title={template.name} onClick={() => setSelectedTemplate(template)} key={index}>
                                <img src={template.image} alt={template.name} />
                            </button>
                        ))
                    }
                </div>
            </div>
        )
    }, [templates])

    const handleColorChange = (type, color) => {
        if (type === 'bg') {
            setSelectedTheme(prev => ({ ...prev, background: color }))
        } else {
            setSelectedTheme(prev => ({ ...prev, color }))
        }
    }

    const themesContainer = useMemo(() => {
        return (
            <>
                <div className="bg-picker">
                    <h4>Background</h4>
                    <ul>
                        {
                            ['#FF0000', '#008000', '#FFFF00'].map((color) => (
                                <li key={color}><button onClick={() => handleColorChange('bg', color)} style={{ width: 25, height: 25, background: color }}></button></li>
                            ))
                        }
                    </ul>
                </div>
                <div className="txt-picker">
                    <h4>Text</h4>
                    <ul>
                        {
                            ['#000', '#fff', '#eaeaea'].map((color) => (
                                <li key={color}><button onClick={() => handleColorChange('text', color)} style={{ width: 25, height: 25, background: color }}></button></li>
                            ))
                        }
                    </ul>
                </div>
            </>
        )
    }, [])

    const currentSidebarElement = useMemo(() => {
        console.log(selectedSidebar)
        switch (selectedSidebar) {
            case 'frames':
                return framesContainer;

            case 'themes':
                return themesContainer;

            default:
                return <h1>test</h1>
        }
    }, [selectedSidebar, framesContainer, themesContainer])


    return (
        <>
            <div className="editor-body">
                <div className="sidebar-container">
                    {
                        SIDEBAR.map(item => (
                            <div key={item.key} onClick={() => setSelectedSidebar(item.key)} className="sidebar-item">
                                <item.icon />
                                <h6>{item.name}</h6>
                            </div>
                        ))
                    }
                </div>

                <div className="picker-container">
                    {currentSidebarElement}
                </div>

                <div className="canvas-container">
                    <CanvasRenderer theme={selectedTheme} selectedImg={selectedImg} template={selectedTemplate} businessDetails={businessDetails} />
                </div>
            </div>
        </>
    )
}

export default Editor;