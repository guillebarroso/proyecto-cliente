import React, {SyntheticEvent, useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import Echo from 'laravel-echo';
import { useParams } from "react-router";

import Cookies from 'universal-cookie';

const cookies = new Cookies();
let prueba = cookies.get('id');

window.Pusher = require('pusher-js');
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'd54277d39bdd4af0472f',
    cluster: 'eu',
    forceTLS: true
});

window.Echo.channel('chat')
.listen('.message', (e) => {
    let div = document.createElement("div");
    div.innerHTML = e.message;
    if(prueba == e.sender_id){
        div.className = "sender";
    }
    else{
        div.className = "receiver";
    }
    
    document.getElementsByClassName("chat-messages")[0].appendChild(div);
});


const Chat = (props) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [prueba, setprueba] = useState(true)

    let { userid } = useParams();


    const enviarMensaje = async (e) => {
        e.preventDefault();
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/send/message',
            withCredentials: true,
            data: {
                "user_id": props.id,
                "sender_user_id": props.id,
                "reciever_user_id": userid,
                "message": message
            }
          });
    }

    const obtenerDatos = async () => {
        debugger
        if(props.id === "visitor" || props.id === undefined){
            props.history.push('/login');
        }
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/read/message',
            withCredentials: true,
            data: {
                "sender_user_id": props.id,
                "reciever_user_id": userid
            }
        }).then(responseArr => {setMessages(responseArr.data);});
    }

    useEffect(() => {
        if(prueba){
            obtenerDatos()
        }
        return () => {
            setprueba(false);
        };
        
    },[]);

    return (   
        <main className="chat">
            {console.log('Funciona:' + userid)}

            <section>
                <div className="chat-header">

                </div>
                <div className="chat-container">
                    {console.log(messages)}
                    <div>
                        <div className="chat-messages">
                            {messages.map((item, i)=>
                                <div key={i} className={item.sender_user_id === props.id? 'sender':'receiver'}>
                                    {item.message}
                                </div>                
                            )}
                        </div>
                    </div>                   
                </div>
                <form className="chat-text" onSubmit={enviarMensaje}>
                    <input className="" type="text" placeholder="Escribe algo..." 
                        onChange={e => setMessage(e.target.value)}            
                    />
                    <button className="button" type="submit">Enviar</button>                
                </form>
            </section>
            
        </main>
        
    )
}

export default Chat
