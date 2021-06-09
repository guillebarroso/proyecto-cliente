import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Pagination from "../components/Pagination";

const OwnInstruments = (props) => {
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
                url: 'http://localhost:80/api/myinstrument/info/' + props.id,
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
                    <h2>Tus instrumentos</h2>
                </header>

                <div className="contenedorCuadros">
                    {currentPosts.map(item =>
                    <div className="visible">
                        <img src={'http://localhost:80/api/instrument/image/' + item.image} alt="Instrumento"></img>
                        <div className="descripcion">
                            <section>
                                <h2>{item.name}</h2>
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
                                
                                <p>{item.description}</p>
                                <Link to={"/reservar/" + item.id}>Gestionar reserva</Link>
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

export default OwnInstruments
