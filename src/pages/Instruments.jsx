import React, { useEffect, useState } from "react";
import axios from 'axios'
import InstrumentProfile from "./InstrumentProfile";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Pagination from "../components/Pagination";


const Instruments = (props) => {
    const [instruments, setInstruments] = useState([]);   

    useEffect(() => {        
        const obtenerDatos = async () => {
            await axios({
                method: 'get',
                url: 'http://localhost:80/api/instrument/info',
                withCredentials: true,
            }).then(response => {
            setInstruments(response.data);
            });
        }
        obtenerDatos();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = instruments.slice(indexOfFirstPost, indexOfLastPost);

    function conversion(x){
        debugger
        x = x*10
        x = (Math.round(x/5)*5)/10;
        return x
    }    

    const onButtonClick=(mode)=>{
        props.setOther_user(mode)
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <main>
        <section className="instruments">
            <header>
                <h2>Echa un vistazo</h2>
            </header>

            <div className="contenedorCuadros">
                {currentPosts.map(item =>
                <div className="visible">
                    <img src={'http://localhost:80/api/instrument/images/' + item.instrument_image} alt="Instrumento"></img>
                    <div className="descripcion">
                        <header>
                            <p>@{item.nickname}</p>
                        </header>
                        <section>
                            <h2 onClick={()=>onButtonClick(item.user_id)}>
                                {/* <Link to="/instrument/profile">{item.name}</Link> */}
                                <Link to={"/instrument/" + item.id}>{item.name}</Link>
                            </h2>
                            <p>
                                {item.location}
                            </p>

                            <p>{conversion(item.stars)}</p>

                            <div>
                                <ReactStars
                                count={5}
                                value={conversion(item.stars)}
                                size={32}
                                edit={false}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                color="rgb(34, 128, 117)"
                                activeColor="rgb(52,209,191)"
                                />
                            </div>
                            
                            <p>
                                {item.description}
                            </p>
                            <button onClick={()=>onButtonClick(item.user_id)}><Link to="/chat">Ver perfil</Link></button>
                        </section>
                    </div>
                </div>
                
                )   
                }
            </div>
            
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={instruments.length}
            paginate={paginate}
            />
            
        </section>
        </main>
    )
}
export default Instruments
