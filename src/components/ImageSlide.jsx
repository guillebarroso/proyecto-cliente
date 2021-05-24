import React from 'react'
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
                                <h2>¿Necesitas un instrumento?</h2>
                            </header>
                            <section>
                                <p>
                                    ¡Encuentra lo que buscas! 
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
                        <div className="publi2">
                            <header>
                                <h1>¿Tienes dudas de como funciona ShareVolume?</h1>
                            </header>
                            <section>
                                <p>
                                    ¡No te preocupes! Te lo explicamos paso a paso.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
                        <div className="publi3">
                            <header>
                                <h1>¿Te atreves a compartir?</h1>
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
