import './MediaList.css';

const MediaList = ({ data }) => {
    return (
        <>
            {
                data?.length > 0 ? 
                data?.map((item) => (
                    <div className="media" key={item.id}>
                        <img src={item.image} alt={item.id} />
                    </div>
                )) : (
                    <p>No Media Found!</p>
                )
            }
        </>
    )
}

export default MediaList