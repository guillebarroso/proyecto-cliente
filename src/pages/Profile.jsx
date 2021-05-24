import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router";

const Profile = () => {

    const [userInfo, setUserInfo] = useState([])

    useEffect(() => {
        (
            async () => {
                await axios({
                method: 'get',
                url: 'http://localhost:80/api/user/1',
                withCredentials: true,
                }).then(response => {
                setUserInfo(response.data);
                });
            }
        )();
    }, []);


    return (
        <div className="gallery-container">
            {console.log(userInfo)}
            {userInfo.map(item =>
            <div className="gallery-card">
                <img className="gallery-thumbnail" src={'http://localhost:80/api/avatar/' + item.image} alt="Imagen de perfil"></img>                       
            
                <p>{item.nickname}</p>
                <p>{item.location}</p>
            </div>            
            )   
            }

        </div>
    )
}

export default Profile
