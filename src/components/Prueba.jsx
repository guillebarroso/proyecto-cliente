import React, {SyntheticEvent, useState} from 'react';
import { useEffect } from 'react';



const Prueba = ({messages, id}) => {

    
    return (
        <div className="chat-messages">
            {messages.map((item, i)=>
                <div key={i} className={item.sender_user_id == id? 'sender':'receiver'}>
                    {item.message}
                </div>                
            )}
        </div>
    )
}

export default Prueba
