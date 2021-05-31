import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
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
    const [prueba, setprueba] = useState(true)
    
  

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
        if(prueba){
            obtenerDatos()
        }
        return () => {
            setprueba(false);
        };
        
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
        <main className="instrument_profile">
            {/* Recibir la info del usuario y del instrumento en el mismo array */}
            {/* {console.log (props.id)} */}
            {/* {props.id==""?console.log("hola"):console.log("nada")} */}
            {/* {console.log (instrumentid)}
            {console.log (instrumentInfo)}
            {console.log (instrumentComments)}
            {console.log (instrumentImages)}
            {console.log (principalImage)}
            {console.log (count)} */}
            {/* <h2>{userOwner == undefined?"":userOwner[0].nickname}</h2> */}
            {/* <h2>{instrumentInfo == undefined?"":instrumentInfo[0].name}</h2> */}
            <h2 className="loginTitle">Perfil del instrumento</h2>
            <section className="containters_instrument_profile">
                <div className="container1_instrument_profile">
                    <div className="image_instrument_profile">
                        <img src={'http://localhost:80/api/instrument/image/' + principalImage} alt="Cargando imagen..."/>
                    </div>

                    <div className="info_instrument_profile">
                        {instrumentInfo.map((item, i) =>
                        <div className="datos_instrument_profile" key={i}>
                            <h2 className="title">{item.instrumentName}</h2>
                            <div className="data_instrument_profile">
                                <div className="etiqueta"><p>{item.type}</p></div>
                                <div className="etiqueta"><p>{item.location}</p></div> 
                                <div className="etiqueta"><p>{stars} <i className="fa fa-star"></i></p></div>                         
                            </div>
                            <div className="price_instrument_profile">
                                <p>{item.starting_price}€/día</p>
                                
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
                                <div className="foto-perfil">
                                    <img className="enlacePerfil-chat" src={'http://localhost:80/api/avatar/' + item.userImage} alt="Foto perfil"/>                                           
                                </div>
                                <div><p>{item.nickname}</p></div> 
                                <Link to="/" type="submit">Chat</Link>
                            </div>
                        </div>
                        )}                                        
                    </div>  
                </div>  
                {/* poner del mismo width que la foto principal y los datos  */}
                <div className="info_instrument_images">
                    {instrumentImages.map((item, i) =>
                    <div className="box-menor" key={i}>
                        {/* mirar esto porque cuando esta carando es lo que da error */}
                        <img src={'http://localhost:80/api/instrument/images/' + item.image_path} alt="Cargando imagen..."/>
                    </div>
                    )}
                    <div className="box-menor">
                        <div className="box-enlace">
                            <Link to={"/images/" + instrumentid}>Ver +</Link>
                        </div>
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
                    {instrumentComments.map((item, i) =>
                    <div key={i}>
                        <div>
                            <div>{item.nickname}</div>
                            <div><p>{item.comment}</p></div>
                        </div>
                    </div>
                    )}
                </div>
            </section>
            
            
        </main>
    )
}

export default InstrumentProfile
