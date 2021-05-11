import React, {SyntheticEvent, useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios'

const Book = (props) => {
    const [instrument_Id, setInstrumentId] = useState('');
    const [costumer_id, setCostumerId] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaDev, setFechaDev] = useState('');
    const [instruments, setInstruments] = useState([])

    useEffect(() => {
        (
            async () => {
                debugger
                await axios({
                    method: 'post',
                    url: 'http://localhost:80/api/user/instruments',
                    withCredentials: true,
                    data: {
                        "user_id": props.id
                    }
                }).then((response) => setInstruments(response.data));
            }
        )();
    }, []);


    const reservar = async (e) => {
        e.preventDefault();
        debugger
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/rent/instrument',
            withCredentials: true,
            data: {
                "owner_id": props.id,
                "instrument_id": instrument_Id,
                "customer_id": 2,
                "initial_date": fechaInicio,
                "return_date": fechaDev
            }
          });

    }

    return (
        <div className="">
            <header>
                <h2 className="">Gestionar reserva</h2>
                <h3>Hola {props.name}! ¿Quién será el afortunado que pueda disfrutar de tu instrumento?</h3>
            </header>
            
            <section>
                <form onSubmit={reservar}>
                    <div className="login_prueba">
                        <input className="inputLogin" type="datetime-local" required
                            onChange={e => setFechaInicio(e.target.value)}
                        />
                        <input className="inputLogin" type="datetime-local" required
                            onChange={e => setFechaDev(e.target.value)}
                        />
                        
                        <select onChange={e => setInstrumentId(e.target.value)}>
                                <option></option>
                            {instruments.map(item =>
                                <option class="visible" value={item.id}>{item.name}</option>                                    
                    
                            )}
                        </select>
                        <button type="submit">Confirmar</button>
                    

                        <footer>
                            <img class="logoRegistro" src="assets/img/logoSharevolume-04.png" alt="Logo de Share Volume"/>
                            <p>Nos alegra tenerte entre nosotros ;)</p>            
                            <img class="logoRegistro" src="assets/img/logoSharevolume-04.png" alt="Logo de Share Volume"/>
                        </footer>
                    </div>

                </form>
            </section>
        </div>
    );
}

export default Book
