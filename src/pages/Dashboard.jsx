import React from 'react'
import ImageSlide from '../components/ImageSlide'

const Dashboard = (props) => {
    return (
        <main>
            {console.log("Funciona?: " + props.name)}
            <section className="comenzar">
                <ImageSlide></ImageSlide>
            </section>

            <section className="tutorial">
                <header>
                    <h2>¿Te echamos un cable?</h2>
                </header>
                <section className="tutorial-section">
                    <figure>
                        <img src="assets/img/logoSharevolume-04.png" alt="Logo de Share Volume"/>
                    </figure>
                    <button className="button-large" href="#">Empezar</button>
                </section>            
            </section>

            <section className="historia">            
                    <header>
                        <h2>Un poco de historia</h2>
                    </header>
                    <section>
                        <div>
                            <p>
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                                culpa qui officia deserunt mollit anim id est laborum."
                            </p>
                            <p>
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                                culpa qui officia deserunt mollit anim id est laborum."
                            </p>
                        </div>                    
                        <figure>
                            <img className="logos" src="assets/img/logos.PNG" alt="Historia Share Volume"/>
                        </figure>
                    </section>
            </section>

        </main>
    )
}

export default Dashboard
