import React from 'react'
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

const ImageSlide = () => {
    const slideImages = [
        "assets/img/audiencia_optimizado.jpg",
        "assets/img/duda_optimizado.jpg",
        "assets/img/concierto_optimizado.jpg"
    ];
    return (
        <div>
            <Slide easing="ease">
                <div className="each-slide">
                    <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
                        <div className="publi1">
                            <header>
                                <h3>¿Necesitas un instrumento?</h3>
                            </header>
                            <section className="slider-box">
                                <p>
                                    ¡Encuentra lo que buscas! 
                                </p>
                                <Link className="enlace-chat" to="/instruments">Buscar</Link> 
                            </section>
                        </div>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                        <div className="publi2">
                            <header>
                                <h3>¿Tienes dudas de como funciona ShareVolume?</h3>
                            </header>
                            <section>
                                <p>
                                    ¡No te preocupes! Te lo explicamos paso a paso en nuestro vídeo tutorial!
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                        <div className="publi3">
                            <header>
                                <h3>¿Te atreves a compartir?</h3>
                            </header>
                            <section>
                                <p>
                                    ¡Empieza a ganar dinero alquilando tus instrumentos! Así de fácil. Ponte en contacto
                                    con tus posibles clientes y organiza tu calendario de forma secilla.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </Slide>
            
        </div>
    )
}

export default ImageSlide
