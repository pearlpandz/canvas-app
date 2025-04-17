import React from 'react'
import { useNavigate } from 'react-router';
import { useTemplate } from '../hook/useTemplate';

function ListPage() {
    const { templates, isLoading } = useTemplate()
    const navigate = useNavigate();

    const handleTemplateEdit = (templateId) => {
        navigate(`/template/edit/${templateId}`);
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='template-list-page'>
            <h1>List of Templates</h1>
            <p>Here you can see the list of templates.</p>
            <div className='template-list'>
                <table className='template-table'>
                    <thead>
                        <tr>
                            <th>Template Name</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            templates.map(template => (
                                <tr key={template._id}>
                                    <td>{template.name}</td>
                                    <td>{template.category}</td>
                                    <td>
                                        <button onClick={() => handleTemplateEdit(template._id)}>Edit</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListPage