import React, {SyntheticEvent, useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import Echo from 'laravel-echo';

    window.Pusher = require('pusher-js');
    debugger
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: 'd54277d39bdd4af0472f',
        cluster: 'eu',
        forceTLS: true
    });
    

    window.Echo.channel('chat')
    .listen('.message', (e) => {
        debugger
        console.log(e);
        let div = document.createElement("div");
        div.innerHTML = e.message;
        div.className = "sender";
        document.getElementsByClassName("chat-messages")[0].appendChild(div);
    });

const Chat = (props) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    

    const enviarMensaje = async (e) => {
        e.preventDefault();
        debugger
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/send/message',
            withCredentials: true,
            data: {
                "sender_user_id": 1,
                "reciever_user_id": 2,
                "message": message
            }
          });
    }

    const obtenerDatos = async () => {
        debugger
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/read/message',
            withCredentials: true,
            data: {
                "sender_user_id": 1,
                "reciever_user_id": 2
            }
        }).then(responseArr => {setMessages(responseArr.data);});
    }

    useEffect(() => {
        obtenerDatos()
    }, []);

    
    
    

    return (   
        <main className="chat">
            {console.log('Funciona:' + props.other_user)}  
            {console.log('Funciona:' + props.id)}
            <div className="chat-container">
                {console.log(messages)}
                <div>
                    <div className="chat-messages">
                    {messages.map((item, i)=>
                        <div key={i} className={item.sender_user_id == props.id? 'sender':'receiver'}>
                            {item.message}   
                        </div>                
                    )   
                    }

                    </div>
                </div>
                
                
            </div>
            <form onSubmit={enviarMensaje}>
                <input className="inputLogin" type="text" placeholder="Escribe algo..." 
                    onChange={e => setMessage(e.target.value)}            
                />
                <button type="submit">Enviar Mensaje</button>
            </form>
            
        </main>
    )
}

export default Chat
