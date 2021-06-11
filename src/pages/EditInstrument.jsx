import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom'


const EditInstrument = (props) => {
    let { instrumentid } = useParams();
    const [images, setImages] = useState([]);
    const [instrumentInfo, setInstrumentInfo] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [principalImage, setPrincipalImage] = useState('')
    const [image, setImage] = useState([]);
    const [newImage, setNewImage] = useState([]);
    const [prueba, setprueba] = useState(true)

    const obtenerDatos = async () => {
        debugger
        try{

            if(props.id === "visitor" || props.id === undefined){
                props.history.push('/login');
            }

            if(props.id != ""){   
                await axios({
                    method: 'post',
                    url: 'http://localhost:80/api/instrument/info/edit',
                    withCredentials: true,
                    data: {
                        "instrument_id": instrumentid,
                        "user_id":props.id
                    }
                    // COmprobar si esti viene vacio
                }).then(response => {
                    console.log(response.data);
                    setPrincipalImage(response.data[0].principalImage);
                    setName(response.data[0].instrumentName);
                    setPrice(response.data[0].starting_price);
                    setDescription(response.data[0].description);
                }).catch(function (error) {
                    if(error.response.status === 404){
                      props.history.push("/");
                    }});
            }
        }catch{
            alert("Hay un error")
        }
        
    }

    useEffect(() => {
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
        }).then(
            (response) => {console.log(response.data);            
        });
        props.history.push("/images/" + instrumentid);
    }

    const deleteInstrument = async (e) => {
        debugger
        e.preventDefault();
        await axios({
            method: 'delete',
            url: 'http://localhost:80/api/delete/instrument/' + instrumentid,
            withCredentials: true,
            }).then((response) => {
                console.log(response.data);
                props.history.push("/");
            });       
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
            <h2 className="loginTitle">Editar instrumento</h2>
            <section className="edit-images-instrument">
                <div className="image_instrument_edit">
                    <img src={'http://localhost:80/api/instrument/image/' + principalImage} alt="Imagen de perfil"/>
                    <form onSubmit={editarImagen}>
                        <div className="edit-images-bottons">
                            <input type="file" name="file" id="file" accept="image/png, image/jpeg" onChange={e => setNewImage({selectedFile:e.target.files[0]})}></input>
                            <div className="button-group">
                                <button className="button" type="submit">Subir imagen</button>
                            </div>  
                        </div>
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
                            <button className="button" type="submit">Subir fotos</button>
                        </div>
                    </form>
                    <Link className="galeria-link" to={"/images/" + instrumentid}>Ver galería</Link>
                    <div className="edit-gallery">                        
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

            <h2 className="loginTitle">Datos</h2>
            <section className="profile-data-edit">
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
                    <div className="button-group">
                        <button className="button" type="submit">Subir</button>
                    </div>
                </form>
            </section>

            <section className="danger">
                <div>
                    <h2>Dangerous Zone</h2>
                </div>

                <form>
                    <div className="button-group">
                        <button onClick={deleteInstrument} type="submit">Eliminar instrumento</button>
                    </div>
                </form>
            </section>
            
        </main>
    )
}

export default withRouter(EditInstrument)
