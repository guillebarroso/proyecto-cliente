import React, {SyntheticEvent, useState} from 'react';
import { useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios'

const ChatDetails = (props) => {

    const [users, setUsers] = useState([{user:0}]); 
    const [prueba, setprueba] = useState(true)
    const [usersna, setUsersna] = useState("")

    const obtenerUsuarios = async () => {
        debugger
        
        if(props.id === "visitor" || props.id === undefined){
            props.history.push('/login');
        }

        await axios({
            method: 'post',
            url: 'http://localhost:80/api/chat/info',
            withCredentials: true,
            data: {
                "user_id": props.id,
            }
        }).then(responseArr => {
            console.log(responseArr.data);
            setUsers(responseArr.data);
            if (responseArr.data.length == 0) {
                setUsersna("Vaya, parece que no tienes contactos todavía")                               
            }
        });
    }

    useEffect(() => {
        if(prueba){
            obtenerUsuarios()
        }
        return () => {
            setprueba(false);
        };
        
    },[]);


    return (
        <main>
            <h2 className="loginTitle">Contactos:</h2>
            <section className="chat-details">
            {usersna != ""?(
                <div className="advert-own-instruments"><p>{usersna}. Busca instrumentos <Link to={"/instruments"}>aquí</Link> y ponte en contacto con gente!!</p></div>
                ):("")}
            {users.map((item, i)=>
                <div key={i} className="details-card">
                    <div className="details-img">
                        <img src={'http://localhost:80/api/avatar/' + item.image} alt="imagen de perfil del usuario" />
                    </div>
                    <div className="details-data">
                        <div className="details-data-user">
                            <Link className="user" to={"/user/" + item.id}>{item.nickname}</Link>
                            <p>{item.name} {item.surname} / {item.location}</p>
                        </div>                      
                        <Link className="enlace-chat" to={"/chat/" + item.id}>Ir al Chat</Link>
                    </div>
                </div>                
            )   
            }                
            </section>            
        </main>
    )
}

export default ChatDetails
