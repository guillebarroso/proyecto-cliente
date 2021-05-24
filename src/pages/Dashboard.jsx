import React from 'react'
import ImageSlide from '../components/ImageSlide'

const Dashboard = (props) => {
    return (
        <main>
            <section class="comenzar">
                <ImageSlide></ImageSlide>
            </section>

            <section class="tutorial">
                <header>
                    <h2>¿Te echamos un cable?</h2>
                </header>
                <section>
                    <figure>
                        <img src="img/logoSharevolume-04.png" alt="Logo de Share Volume"/>
                    </figure>
                    <a class="botones" href="#"><div>Empezar</div></a>
                </section>            
            </section>

            <section class="historia">            
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
                            <img class="logos" src="img/logos.PNG" alt="Historia Share Volume"/>
                        </figure>
                    </section>
            </section>

        </main>
    )
}

export default Dashboard
