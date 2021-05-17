import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Redirect, useParams } from "react-router";
import ReactStars from "react-rating-stars-component";

const InstrumentProfile = (props) => {

    let { instrumentid } = useParams();

    const [instrumentInfo, setInstrumentInfo] = useState([])
    const [instrumentComments, setInstrumentComments] = useState([])
    const [instrumentImages, setInstrumentImages] = useState([])
    const [principalImage, setPrincipalImage] = useState("")
    const [count, setCount] = useState(0)
    const [stars, setStars] = useState(0)
    const [comentario, setComentario] = useState("")

    const obtenerDatos = async () => {
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/user/info',
            withCredentials: true,
            data: {
                "instrument_id": instrumentid
            }
            // COmprobar si esti viene vacio
        }).then(response => {
            setInstrumentInfo(response.data[0]);
            setInstrumentComments(response.data[1]);
            setInstrumentImages(response.data[2]);
            setPrincipalImage(response.data[0][0].principalImage);
            setCount(response.data[3][0].count);
            setStars(response.data[4][0].stars);
          });
    }

    useEffect(() => {
        debugger
        obtenerDatos()
    },[]);

    const ratingChanged = async (newRating) => {
        debugger
        console.log(newRating);
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/rate/instruments',
            withCredentials: true,
            data: {
                "user_id": props.id,
                "stars": newRating,
                "liked_instrument_id": instrumentid
            }
          });
      };

    const enviarComentario = async (e) => {
        e.preventDefault();
        debugger
        props.id==""?<Redirect to='/login'/>:
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/comment/instrument',
            withCredentials: true,
            data: {
                "user_id": props.id,
                "comment": comentario,
                "commented_instrument_id": instrumentid
            }
          });
          setComentario("")

    }

    



    return (
        <div className="instrument_profile">
            {/* Recibir la info del usuario y del instrumento en el mismo array */}
            {console.log (props.id)}
            {/* {props.id==""?console.log("hola"):console.log("nada")} */}
            {console.log (instrumentid)}
            {console.log (instrumentInfo)}
            {console.log (instrumentComments)}
            {console.log (instrumentImages)}
            {console.log (principalImage)}
            {console.log (count)}
            {/* <h2>{userOwner == undefined?"":userOwner[0].nickname}</h2> */}
            {/* <h2>{instrumentInfo == undefined?"":instrumentInfo[0].name}</h2> */}
            <div className="container1_instrument_profile">
                <div className="images_instrument_profile">
                    <div className="caja-mayor2">
                        <div className="caja-mayor">
                            <div className="box">
                                <img src={'http://localhost:80/api/instrument/image/' + principalImage} alt="Cargando imagen..."/>
                            </div>
                        </div>
                    </div>
                    <div className="caja-menor">
                        {instrumentImages.map(item =>
                        <div className="caja">                    
                            <div className="box">
                                <img src={'http://localhost:80/api/instrument/images/' + item.image_path} alt="Cargando imagen..."/>
                            </div>
                        </div>
                        )}
                    </div>
                </div>

                <div className="info_instrument_profile">
                    {instrumentInfo.map(item =>
                    <div className="datos_instrument_profile">
                        <h2 className="title">{item.instrumentName}</h2>
                        <div className="data_instrument_profile">
                            <p>{item.type}</p>
                            <p>{item.location}</p>                            
                        </div>
                        <div className="price_instrument_profile">
                            <p>{item.starting_price}</p>
                        </div>
                        <div className="stars_instrument_profile">
                            <p>{stars} <i className="fa fa-star"></i></p>
                        </div>
                        <div className="stars_instrument_profile">
                            <ReactStars
                            count={5}
                            value={0}
                            onChange={ratingChanged}
                            size={64}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            color="rgb(34, 128, 117)"
                            activeColor="rgb(52,209,191)"
                            />
                        </div>
                        <div className="description_instrument_profile">
                            <p>{item.description}</p>
                        </div>
                        <div className="owner_instrument_profile">
                            <div><p>{item.nickname}</p></div> 
                            <img class="foto-perfil" src={'http://localhost:80/api/avatar/' + item.userImage} alt="Foto perfil"/>                                           
                            <button type="submit">Chat</button>
                        </div>
                    </div>
                     )}                                        
                </div>                
            </div>
            <div className="container2_instrument_profile">
                <h3>Cometarios:</h3>
                <form onSubmit={enviarComentario}>
                    <input className="inputLogin" type="text" placeholder="Introduce un comentario" required
                        onChange={e => setComentario(e.target.value)}
                    />                
                    <button type="submit">Iniciar sesión</button>
                </form>
                {instrumentComments.map(item =>
                <div>
                    <div>
                        <div>{item.nickname}</div>
                        <div><p>{item.comment}</p></div>
                    </div>
                </div>
                )}
            </div>
            
            
        </div>
    )
}

export default InstrumentProfile
