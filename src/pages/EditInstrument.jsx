import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router";
import { Link } from "react-router-dom";


const EditInstrument = () => {
    let { instrumentid } = useParams();
    const [images, setImages] = useState([]);
    const [instrumentInfo, setInstrumentInfo] = useState([])
    const [instrumentImages, setInstrumentImages] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [principalImage, setPrincipalImage] = useState('')
    const [image, setImage] = useState([]);
    const [newImage, setNewImage] = useState([]);
    const [prueba, setprueba] = useState(true)

    const obtenerDatos = async () => {
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/instrument/info',
            withCredentials: true,
            data: {
                "instrument_id": instrumentid
            }
            // COmprobar si esti viene vacio
        }).then(response => {
            console.log(response.data);
            setInstrumentImages(response.data[2]);
            setPrincipalImage(response.data[0][0].principalImage);
            setName(response.data[0][0].instrumentName);
            setPrice(response.data[0][0].starting_price);
            setDescription(response.data[0][0].description);
          });
    }

    useEffect(() => {
        debugger
        if(prueba){
            obtenerDatos()
        }
        return () => {
            setprueba(false);
        };
        
    },[]);

    const uploadInstrument = async (e) => {
        debugger
        e.preventDefault();
        
        const data4 = new FormData();
        for (let i = 0; i < images.length; i++) {
            data4.append(`image_path[${i}]`, images[i])
        }
        data4.append('instrument_id', instrumentid);
        console.log(data4.getAll);
        await axios({
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data",
            },
        url: 'http://localhost:80/api/instrument/images',
        withCredentials: true,
        data: data4
        }).then((response) => console.log(response.data));
    }

    const editarDatos = async (e) => {
        debugger
        e.preventDefault();
        await axios({
        method: 'post',
        url: 'http://localhost:80/api/update/instrument/' + instrumentid,
        withCredentials: true,
        data: {
            "name": name,
            "price": price,
            "description": description
        }
        }).then((response) => console.log(response.data));
    }


    const editarImagen = async (e) => {
        debugger
        e.preventDefault();
        const data3 = new FormData();
        data3.append('image', newImage.selectedFile);
        await axios({
        method: 'post',
        url: 'http://localhost:80/api/update/instrument/image/' + instrumentid,
        headers: {
            "Content-Type": "multipart/form-data",
            },
        withCredentials: true,
        data: data3
        }).then((response) => {
            console.log(response.data);
            setPrincipalImage(response.data);
          });
    }


    return (
        <main className="editar-instrumentos">
            {console.log(name)}
            {console.log(price)}
            {console.log(description)}
            {console.log(newImage)}
            <section className="edit-images-instrument">
                <div className="image_instrument_edit">
                    <img src={'http://localhost:80/api/instrument/image/' + principalImage} alt="Imagen de perfil"/>
                    <form onSubmit={editarImagen}>
                        <input type="file" name="file" id="file" accept="image/png, image/jpeg" onChange={e => setNewImage({selectedFile:e.target.files[0]})}></input>
                        <button type="submit">Editar imagen principal</button>
                    </form>
                </div>
                <div className="add-images">
                    <h3>Aquí puedes subir todas las imágenes que quieras</h3>
                    <form encType="multipart/form-data" onSubmit={uploadInstrument}>
                        <div className="form-upload-images">
                            <label className="file-label" htmlFor="file-multiple">
                                <i class="fas fa-plus-circle"></i>
                                <span className="selected-files">{images.length} archivos seleccionados</span>
                            </label>
                            <input type="file" name="file-multiple" id="file-multiple" className="file-images" multiple accept="image/png, image/jpeg" onChange={e => setImages(e.target.files)}></input>
                            <button type="submit">Subir fotos</button>
                        </div>
                    </form>
                    <div className="edit-gallery">
                        <Link to={"/images/" + instrumentid}>Ver +</Link>
                        <div>
                            <h4>¿Qué es la galería?</h4>
                            <p>
                                La galería es el lugar donde podrás ver todas las fotos que
                                vayas subiendo de tu instrumento. En esta página podrás ver 
                                una lista de todas tus imágenes, y si pinchas en una, la podrás
                                en tamaño real.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="datos_instrument_profile">
                <form onSubmit={editarDatos}>
                    <div class="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input type="text" class="form-control" id="name" name="name" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="price">Precio:</label>
                        <input type="number" class="form-control" id="price" name="price" value={price} onChange={e => setPrice(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label htmlFor="description">Descripción:</label>
                        <textarea class="form-control" id="description" name="description" value={description} onChange={e => setDescription(e.target.value)}/>
                    </div>
                    <button type="submit">Editar datos instrumento</button>
                </form>
            </section>

            <section>
                <div>
                    <h2>Dangerous Zone</h2>
                </div>

                <form>
                    <button type="submit">Elimanar instrumento</button>
                </form>
            </section>
            
        </main>
    )
}

export default EditInstrument
