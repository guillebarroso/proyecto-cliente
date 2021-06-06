import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Search = () => {

    let { param2 } = useParams();
    let { param } = useParams();

    const [datos, setDatos] = useState([])

    const obtenerDatos= async () => {
        debugger
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/search/' + param2,
            withCredentials: true,
            data: {
                "word": param,
            }
        }).then(responseArr => {
            console.log(responseArr.data);
            setDatos(responseArr.data);
        });
    }

    useEffect(() => {
        obtenerDatos()        
    }, []);


    return (
        <main>
            {console.log(param)}
            {console.log(param2)}
            <h2>Prueba</h2>
            
        </main>
    )
}

export default Search
