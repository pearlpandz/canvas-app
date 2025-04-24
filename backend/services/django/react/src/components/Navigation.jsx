export default function Navigation({onClick, mode}) {
    return (
        <div className="navigation">
            <h4>New Template</h4>
            <button className="nav-action" onClick={onClick}>{mode === 'edit' ? 'Update Template' : 'Save Template'}</button>
        </div>
    )
}