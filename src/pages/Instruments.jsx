import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Pagination from "../components/Pagination";


const Instruments = (props) => {
    const [instruments, setInstruments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = instruments.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {        
        const obtenerDatos = async () => {
            await axios({
                method: 'get',
                url: 'http://localhost:80/api/info/instruments',
                withCredentials: true,
            }).then(response => {
            setInstruments(response.data);
            });
        }
        obtenerDatos();
    }, []);

    function conversion(x){
        x = x*10
        x = (Math.round(x/5)*5)/10;
        return x
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
                        <img src={'http://localhost:80/api/instrument/image/' + item.instrument_image} alt="Instrumento"></img>
                        <div className="descripcion">
                            <header>
                                <h4>@{item.nickname}</h4>
                            </header>
                            <section className="card-back">
                                <h2>{item.name}</h2>
                                <p>{item.location}</p>
                                <p className="card-rate">{conversion(item.stars)}</p>
                                <div className="card-rate-visual">
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
                                <p className="card-description">{item.description}</p>
                                <Link className="card-link-chat" to={"/instrument/" + item.id}>Ver perfil</Link>
                            </section>
                        </div>
                    </div>
                    
                    )}
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
