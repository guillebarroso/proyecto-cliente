import React, {SyntheticEvent, useState} from 'react';
import { useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios'

const ChatDetails = (props) => {

    const [users, setUsers] = useState([{user:0}]);

    

    const obtenerUsuarios = async () => {
        debugger
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
        });
    }

    useEffect(() => {
        obtenerUsuarios()        
    }, []);


    return (
        <main>
            <section className="chat-details">
            {users.map((item, i)=>
                <div key={i} className="details-card">
                    <div className="details-img">
                        <img src="https://cdn.andro4all.com/files/2020/02/Futurama.jpg" alt="" />
                    </div>
                    <div className="details-data">
                        <div>
                            <Link to={"/user/" + item.id}>{item.nickname}</Link>
                            <p>{item.name} / Aqui el location</p>
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
