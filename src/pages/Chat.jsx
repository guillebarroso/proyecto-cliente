import React, {SyntheticEvent, useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import Echo from 'laravel-echo';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    window.Pusher = require('pusher-js');

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: 'd54277d39bdd4af0472f',
        cluster: 'eu',
        forceTLS: true
    });
    

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

    useEffect(() => {
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

        obtenerDatos()
    }, []);

    
    window.Echo.channel('chat')
    .listen('.message', (e) => {
        debugger
        //Hacer debugger aqui
        console.log(e);
        let div = document.createElement("div");
        div.innerHTML = e.message;
        div.className = "sender";
        document.getElementsByClassName("chat-messages")[0].appendChild(div);
    });
    

    return (   
        <div>     
            <div className="chat-container">
                {console.log(messages)}
                <div>

                </div>
                <div>
                    <div className="chat-messages">
                    {messages.map(item =>
                        <div class={item.sender_user_id == 1? 'sender':'receiver'}>
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
        </div>
    )
}

export default Chat
