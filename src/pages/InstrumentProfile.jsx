import React, { useEffect, useState } from "react";
import axios from 'axios'

const InstrumentProfile = () => {

    const [userOwner, setUserOwner] = useState([])
    const [instrumentComments, setInstrumentComments] = useState([])
    const [instrumentImages, setInstrumentImages] = useState([])

    useEffect(() => {
        (
            async () => {
                
                await axios({
                    method: 'post',
                    url: 'http://localhost:80/api/user/info',
                    withCredentials: true,
                    data: {
                        "user_id":1,
                        "instrument_id": 1
                    }
                }).then(response => {
                    setUserOwner(response.data[0]);
                    setInstrumentComments(response.data[1]);
                    setInstrumentImages(response.data[2]);
                  });
            }       


        )();
    }, []);
    return (
        <div>
            <h2>Propietario: {userOwner[0].nickname}</h2> 
            {console.log (userOwner)}
            {console.log (instrumentComments)}
            {console.log (instrumentImages)}
            {instrumentImages.map(item =>
            <div class="caja">
                <div class="box">
                    <img src={'http://localhost:80/api/instrument/images/' + item.image_path} alt="Cargando imagen..."/>
                </div>
            </div>
            )}
            {/* <div class="caja">
                <div class="box">
                    <img src="http://localhost:80/api/instrument/images/1620152616guitarra.jpg" alt="Cargando imagen..."/>
                </div>
            </div> */}
            {/* <img src="http://localhost:80/api/instrument/images/1620152616guitarra.jpg" alt="imagen"/> */}
            
        </div>
    )
}

export default InstrumentProfile
