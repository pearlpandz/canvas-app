import { useEffect, useState } from "react";
import './List.css';

function List(props) {
    const { setSelectedImg } = props;
    const [photos, setPhotos] = useState([]);
    
    useEffect(() => {
        fetch("https://api.unsplash.com/photos/?client_id=xGPW7tpKUYE6kyWR-vOWtpp_ZOUxpAbeH4AdA5Z-tgk")
            .then((response) => response.json())
            .then((data) => {
                setPhotos(data);
            })
            .catch((error) => {
                console.error("Error fetching notes:", error);
            });
    }, [])

    return (
        <div className="list">
            {
                photos.map((photo) => (
                    <div key={photo.id} className="card" onClick={() => setSelectedImg(photo?.urls?.full)}>
                        <img src={photo.urls.thumb} alt={photo.alt_description} />
                    </div>
                ))
            }
        </div>
    )
}


export default List;