import React, {SyntheticEvent, useState} from 'react';
import axios from 'axios';

const UploadInstruments = (props) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');


    const uploadInstrument = async (e) => {
        debugger
        e.preventDefault();
        // console.log(name);
        // console.log(type);
        // console.log(price);
        // console.log(description);
        let form = document.getElementById("avatar");
        console.log(form);
        console.log(image);
        let data2 = new FormData();
        console.log(data2);
        data2 = data2.append('image', form);
        // console.log(data2);
        await axios({
            method: 'post',
            // headers: {
            //     "Content-Type": "multipart/form-data",
            //   },
            url: 'http://localhost:80/api/add/instrument',
            withCredentials: true,
            data: {
                "user_id":props.id,
                "name": name,
                "type": type,
                "starting_price": price,
                "description": description,
                "image": data2,
            }
          }).then((response) => console.log(response.data));
          console.log("todo bien");

    }


    return (
        <div>
            <h2>prueba{props.id}</h2>
            <section>
                <form onSubmit={uploadInstrument}>
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
                        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={e => setImage(e.target.value)}></input>

                        <button type="submit">Subir instrumento</button>
                    
                    </div>

                </form>
            </section>
            
        </div>
    )
}

export default UploadInstruments
