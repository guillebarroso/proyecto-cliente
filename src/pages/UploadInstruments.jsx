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
        data3.append('user_id', 9);
        data3.append('name', name);
        data3.append('type', type);
        data3.append('starting_price', price);
        data3.append('description', description);
        data3.append('image', image.selectedFile);
        console.log(data3.getAll(name));    
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
            <section>
                <form encType="multipart/form-data" onSubmit={uploadInstrument}>
                    <div className="login_prueba">
                        <input className="inputLogin" type="text" placeholder="name" required
                            onChange={e => setName(e.target.value)}
                        />
                        <select name="select" required onChange={e => setType(e.target.value)}>
                            <option value="guitar">Guitarras</option>
                            <option value="bass" selected>Bajos</option>
                            <option value="drum">Baterías</option>
                            <option value="piano">Pianos</option>
                            <option value="other">Otros</option>
                        </select>
                        {/* <input className="inputLogin" type="text" placeholder="type" required
                            onChange={e => setType(e.target.value)}
                        /> */}
                        <input className="inputLogin" type="number" placeholder="starting_price" required
                            onChange={e => setPrice(e.target.value)}
                        />
                        <textarea className="inputLogin" placeholder="description" required
                            onChange={e => setDescription(e.target.value)}            
                        />
                        <label for="avatar">Sube la foto principal de tu instrumento:</label>
                        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={e => setImage({selectedFile:e.target.files[0]})}></input>

                        <button type="submit">Subir fotos</button>
                    
                    </div>

                </form>
            </section>
            
        </main>
    )
}

export default withRouter(UploadInstruments)
