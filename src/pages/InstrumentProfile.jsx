import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactDatePicker from 'react-datepicker';
import ReactStars from "react-rating-stars-component";
import {withRouter} from 'react-router-dom'


const InstrumentProfile = (props) => {

    let { instrumentid } = useParams();

    const [instrumentInfo, setInstrumentInfo] = useState([])
    const [instrumentComments, setInstrumentComments] = useState([])
    const [instrumentImages, setInstrumentImages] = useState([])
    const [principalImage, setPrincipalImage] = useState("")
    const [stars, setStars] = useState(0)
    const [comentario, setComentario] = useState("")
    const [bandera, setBandera] = useState(true)
    const [fechasOcupadas, setFechasOcupadas] = useState([]);
    // const [cargando, setCargando] = useState(true)
  

    const obtenerDatos = async () => {
        try{
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/instrument/info',
            withCredentials: true,
            data: {
                "instrument_id": instrumentid
            }
        }).then(response => {
            setInstrumentInfo(response.data[0]);
            setInstrumentComments(response.data[1]);
            setPrincipalImage(response.data[0][0].principalImage);
            procesarFechas(response.data[2])
            setStars(response.data[3][0].stars);
          });
        }catch{
            alert("Hay algún error")
        }
    }

    useEffect(() => {
        if(bandera){
            obtenerDatos()
        }
        return () => {
            setBandera(false);
        };
        
    },[]);

    const verificar = (x) => {
        debugger
        console.log(x);
        if(props.id != x && props.id != ""){             
            props.history.push("/chat/" + x)           

        }  
        else{
            alert("No puedes acceder al chat")
        }  
      };

    const ratingChanged = async (newRating) => {
        debugger
        if (props.id != "") {
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
        }
        else{
            alert("Tu puntuación no se realizará hasta que inicies sesión")
        }      
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

    const procesarFechas = (x) => {
        let prueba = []
        for (let y = 0; y < x.length; y++) {
            for (let i = new Date(x[y].initial_date); i <= new Date(x[y].return_date); i.setDate(i.getDate() + 1)) {
                prueba.push(new Date(i));               
            }            
        }
        setFechasOcupadas(prueba)
        
    };

    return (
        <main className="instrument_profile">
            {console.log(stars)}
            {instrumentInfo.map((item, i) =>
            <section className="datos_instrument_profile" key={i}>
                <h2 className="loginTitle">{item.instrumentName}</h2>
                <div className="data_instrument_profile">
                    <div className="etiqueta"><p>{item.type}</p></div>
                    <div className="etiqueta"><p>{item.location}</p></div> 
                    {stars===0 || stars === null?
                    (
                        <div className="etiqueta"><p>Sin puntuación</p></div>
                        
                    ):(
                        <div className="etiqueta"><p>{stars} <i className="fa fa-star"></i></p></div>
                    )}
                                            
                </div>
                <div className="info_instrument_profile">
                    <div className="image_instrument_profile">
                        <img src={'http://localhost:80/api/instrument/image/' + principalImage} alt="Cargando imagen..."/>
                    </div>


                    <div className="text_instrument_profile">
                        <div className="price_instrument_profile">
                            <p>{item.starting_price}€/día</p>                            
                        </div>
                        <div className="stars_instrument_profile">
                            <ReactStars                            
                            count={5}
                            value={item.stars}
                            onChange={ratingChanged}
                            size={64}
                            isHalf={true}
                            color="rgb(34, 128, 117)"
                            activeColor="rgb(52,209,191)"
                            size={''}
                            />                        
                            {/* El size de arriba lo pongo así para poder editarlo yo en el css como quiera */}
                        </div>
                        <div className="description_instrument_profile">
                            <p>{item.description}</p>
                        </div>
                        <div className="owner_instrument_profile">
                            <div className="foto-perfil">
                                <img className="enlacePerfil-chat" src={'http://localhost:80/api/avatar/' + item.userImage} alt="Foto perfil"/>                                           
                            </div>
                            <div><p>{item.nickname}</p></div> 
                            <a  href="" onClick={() => verificar(item.userID)}>Chat</a>
                        </div>
                    </div>
                </div>
            </section>
            )}

            <section className="calendar-profile">
                <h3>Fechas prohibidas...</h3>

                <ReactDatePicker
                startDate={new Date()}
                minDate={new Date()}
                excludeDates={fechasOcupadas}
                monthsShown={2}
                inline
                />
            </section>

            <section className="comments">
                <h3>Cometarios:</h3>
                <form onSubmit={enviarComentario}>
                    <div className="comments-form">
                        <textarea className="comment" type="text" placeholder="Introduce un comentario" required
                            onChange={e => setComentario(e.target.value)}
                        />                
                        <button className="button" type="submit">Enviar</button>
                    </div>
                </form>
                <div className="comments-box">
                    {instrumentComments.map((item, i) =>
                    <div className={item.nickname==props.nickname?"comment-you":"comment-other"} key={i}>
                        <div className="comment-header">
                            <div className="foto-perfil">
                                <img className="enlacePerfil-chat" src={'http://localhost:80/api/avatar/' + item.image} alt="Foto perfil"/>
                            </div>
                            <div className="comment-nick">{item.nickname}</div>
                        </div>
                        <div className="comment-body">
                            <div className="comment-text"><p>{item.comment}</p></div>
                        </div>
                    </div>
                    )}
                </div>
            </section>           
            
            
        </main>
    )
}

export default withRouter(InstrumentProfile)
