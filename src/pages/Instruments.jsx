import React, { useEffect, useState } from "react";
import axios from 'axios'
import InstrumentProfile from "./InstrumentProfile";
import { Route } from "react-router";
import { Link } from "react-router-dom";

const Instruments = () => {
    const [instruments, setInstruments] = useState([])

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:80/api/instrument/info', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });
    
                const content = await response.json();
                setInstruments(content)
            }
        )();
    }, []);

    return (
        <section class="aplicacion">
            <header>
            <h2>Echa un vistazo</h2>
            </header>

            <div class="contenedorCuadros">
                {instruments.map(item =>
                <div class="visible">
                    <img src="img/guitarra.jpg" alt="Instrumento"></img>
                    <div class="descripcion">
                        <header>
                            <p>@{item.nickname}</p>
                        </header>
                        <section>
                            <h2>
                                <Link to="/instrumentprofile">{item.name}</Link>
                            </h2>
                            <p>
                                {item.location}
                            </p>

                            <p class="estrellas">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                                <i class="far fa-star"></i>
                            </p>
                            
                            <p>
                                {item.description}
                            </p>
                        </section>
                    </div>
                </div>
                
                )   
                }
            </div>



            <a class="botones" href="#"><div>Cargar más</div></a>          
            
        </section>
    )
}
export default Instruments
