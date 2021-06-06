import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";

const Users = (props) => {

    const [userInfo, setUserInfo] = useState([])
    const [userComments, setUserComments] = useState([])
    const [comentario, setComentario] = useState("")
    const [prueba, setprueba] = useState(true)


    const obtenerDatos = async () => {
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/user/info',
            withCredentials: true,
            data: {
                "user_id": props.id
            }
            // COmprobar si esti viene vacio
        }).then(response => {
            setUserInfo(response.data[0]);
            setUserComments(response.data[1]);
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
                "commented_user_id": props.id
            }
          });
          setComentario("")

    }

    return (
        <main className="instrument_profile">
            {/* <div className="image_instrument_profile">
                <img src={'http://localhost:80/api/instrument/image/' + principalImage} alt="Cargando imagen..."/>
            </div> */}
            {userInfo.map((item, i) =>
            <section className="datos_instrument_profile" key={i}>
                <h2 className="loginTitle">{item.nickname}</h2>
                <div className="data_instrument_profile">
                    <div className="etiqueta"><p>{}</p></div>
                    <div className="etiqueta"><p>{}</p></div> 
                    <div className="etiqueta"><p>{} <i className="fa fa-star"></i></p></div>                         
                </div>
                <div className="info_instrument_profile">
                    <div className="image_instrument_profile">
                        <img src={'http://localhost:80/api/instrument/image/'} alt="Cargando imagen..."/>
                    </div>


                    <div className="text_instrument_profile">
                        <div className="price_instrument_profile">
                            <p>{}€/día</p>                            
                        </div>
                        <div className="description_instrument_profile">
                            <p>{}</p>
                        </div>
                        <div className="owner_instrument_profile">
                            <div className="foto-perfil">
                                <img className="enlacePerfil-chat" src={'http://localhost:80/api/avatar/'} alt="Foto perfil"/>                                           
                            </div>
                            <div><p>{item.nickname}</p></div> 
                            <Link to="/" type="submit">Chat</Link>
                        </div>
                    </div>
                </div>
            </section>
            )}                                  
            <section className="comments">
                {console.log(props.nickname)}
                <h3>Cometarios:</h3>
                <form onSubmit={enviarComentario}>
                    <textarea className="comment" type="text" placeholder="Introduce un comentario" required
                        onChange={e => setComentario(e.target.value)}
                    />                
                    <button type="submit">Iniciar sesión</button>
                </form>
                <div className="comments-box">
                    {userComments.map((item, i) =>
                    <div className={item.nickname==props.nickname?"comment_you":"comment_other"} key={i}>
                        <div>
                            <div className="comment_nick">{}</div>
                            <div className="comment_text"><p>{}</p></div>
                        </div>
                    </div>
                    )}
                </div>
            </section>
            
            
        </main>
    )
}

export default Users

