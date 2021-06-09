import React, {SyntheticEvent, useState} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'


const UploadInstruments = (props) => {
    const [id, setId] = useState(0)
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);


    const uploadInstrument = async (e) => {
        debugger
        e.preventDefault();
        const data3 = new FormData();
        data3.append('user_id', props.id);
        data3.append('name', name);
        data3.append('type', type);
        data3.append('starting_price', price);
        data3.append('description', description);
        data3.append('image', image.selectedFile);
        await axios({
            method: 'post',
            headers: {
                "Content-Type": "multipart/form-data",
            },
            url: 'http://localhost:80/api/add/instrument',
            withCredentials: true,
            data: data3
        }).then(response => {
        console.log(response.data.id);
        setId(response.data.id);
        });

        if (id!=0) {
            props.history.push('/edit/'+ id)            
        }
    }


    return (
        <main>
            <h2 className="loginTitle">Subir instrumento</h2>
            <section className="upload">
                <form encType="multipart/form-data" onSubmit={uploadInstrument}>
                    <div className="upload-data">
                        <div class="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <input class="form-control" type="text" id="name" name="name" placeholder="name" required
                            onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div class="form-group">
                            <label htmlFor="instrument">Instrumento:</label>
                            <select class="form-control" name="select" required name="instrument" id="instrument" onChange={e => setType(e.target.value)}>
                                <option value="">Elige una de las opciones</option>
                                <option value="guitar">Guitarras</option>
                                <option value="bass">Bajos</option>
                                <option value="drum">Baterías</option>
                                <option value="piano">Pianos</option>
                                <option value="other">Otros</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label htmlFor="price">Precio inicial por días:</label>
                            <input class="form-control" type="number" name="price" id="price" placeholder="starting_price" required
                            onChange={e => setPrice(e.target.value)}
                            />
                        </div>

                        <div class="form-group">
                            <label htmlFor="description">Descripción:</label>
                            <textarea class="form-control" name="description" id="description" placeholder="description" required
                            onChange={e => setDescription(e.target.value)}            
                            />
                        </div>

                        <div class="form-group">
                            <label htmlFor="image">Imagen principal del instrumento:</label>
                            <input class="form-control" type="file" name="image" id="image" accept="image/png, image/jpeg" onChange={e => setImage({selectedFile:e.target.files[0]})}></input>
                        </div>
                        
                        <button type="submit">Subir fotos</button>

                    </div>
                </form>
            </section>            
        </main>
    )
}

export default withRouter(UploadInstruments)
