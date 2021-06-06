import React, {SyntheticEvent, useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import Echo from 'laravel-echo';

    window.Pusher = require('pusher-js');
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: 'd54277d39bdd4af0472f',
        cluster: 'eu',
        forceTLS: true
    });
    
    //Poner aqui lo de recibir param?

    window.Echo.channel('chat')
    .listen('.message', (e) => {
        console.log(e);
        // if(e.status == 0 || props.id == e.rec_id){
        //     axios.post('/conversations/'+ 1);
        // }
        let div = document.createElement("div");
        div.innerHTML = e.message;
        div.className = "sender";
        document.getElementsByClassName("chat-messages")[0].appendChild(div);
    });

const Chat = (props) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([{user:0}]);

    

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

    const obtenerDatos = async (x,e) => {
        debugger
        e.preventDefault();
        console.log(e.target.value);
        
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/read/message',
            withCredentials: true,
            data: {
                "sender_user_id": 1,
                "reciever_user_id": x
            }
        }).then(responseArr => {setMessages(responseArr.data);});
    }

    const obtenerUsuarios = async () => {
        debugger
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/chat/info',
            withCredentials: true,
            data: {
                "user_id": 1,
            }
        }).then(responseArr => {
            console.log(responseArr.data);
            setUsers(responseArr.data);
        });
    }

    useEffect(() => {
        obtenerUsuarios()        
    }, []);

    
    
    

    return (   
        <main className="chat">
            {console.log('Funciona:' + props.other_user)}  
            {console.log('Funciona:' + props.id)}

            <section>
            {users.map((item, i)=>
                <div key={i} className="">
                    <a onClick={(e) => obtenerDatos(item.user, e)} href="">{item.user}</a>
                </div>                
            )   
            }                
            </section>

            <section>
                <div className="chat-header">

                </div>
                <div className="chat-container">
                    {console.log(messages)}
                    <div>
                        <div className="chat-messages">
                        {messages.map((item, i)=>
                            <div key={i} className={item.sender_user_id == props.id? 'sender':'receiver'}>
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
                    <button type="submit">Enviar Mensaje</button>                
                </form>
            </section>
            
        </main>
        
    )
}

export default Chat
