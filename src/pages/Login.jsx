import React, {SyntheticEvent, useState} from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'


const Login = (props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');
    const [esregistro, setEsregistro] = useState(false)
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);
    const [prueba, setprueba] = useState([])
    


    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()) {
            // setError("Escribe un email")
          return
        }
        if(!password.trim()) {
            // setError("Escribe una password")
            return
          }
          if(password.length<6) {
            // setError("Escribe una contraseña de 6 o mas carácteres")
            return
          }
          //aqui debería ir si es login, y si no sigo comprobando
        if(esregistro){
            registrar()
        } else {
            // login()
        }
    }

    const registrar = async (e) => {
        e.preventDefault();
        debugger
        const data3 = new FormData();
        data3.append('name', name);
        data3.append('surname', surname);
        data3.append('age', age);
        data3.append('email', email);
        data3.append('nickname', nickname);
        data3.append('location', location);
        data3.append('password', password);
        data3.append('description', description);
        data3.append('image', image.selectedFile);
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/register',
            withCredentials: true,
            data: data3
          });

    }        

    const login = async (e) => {
        debugger
        e.preventDefault();
        try{    
            await axios({
                method: 'post',
                url: 'http://localhost:80/api/login',
                withCredentials: true,
                data: {
                    "email": email,
                    "password":password
                }
            }).then((response) => props.setName(response.data[0].name));
            
            setEmail("")
            setPassword("")            // setError(null)
            props.history.push('/')

        }
        catch(error){
            console.log(error)
            alert("No se ha podido iniciar sesión");
            // if (error.code==="auth/user-not-found" || error.code==="auth/wrong-password") {
            //     setError("Email y/o password incorrecto")
            // }
        }
    }


    return (
        <main>
            {console.log(props.name)}
            {console.log(location)}
            {console.log(description)}
            <section>
                <h2 className="loginTitle">
                    {esregistro? "Registro":"Iniciar sesión"}
                </h2>

                <section className="logBox">
                    <div className="logReg">
                        <button className="log_button" onClick={()=>setEsregistro(false)}>Iniciar sesión</button>
                        <button className="reg_button" onClick={()=>setEsregistro(true)}>Registrarse</button>
                    </div>
                    <div className={esregistro? "registrate":"iniciaSesion"}>       
                        {!esregistro && (                        
                            <form onSubmit={login}>
                                <div className="loginContent">
                                    <h3>¡Hola de nuevo!</h3>
                                    <input className="inputLogin" type="text" placeholder="Email" required
                                        onChange={e => setEmail(e.target.value)}/>

                                    <input className="inputLogin" type="password" placeholder="Password" required
                                        onChange={e => setPassword(e.target.value)}/>

                                    <button type="submit">Iniciar sesión</button>
                                </div>
                            </form>                        
                        )}
                        {esregistro && (
                            <form onSubmit={registrar}>
                                <div className="registerContent">
                                    <h3>Ya estabas tardando...</h3>
                                    <label htmlFor=""></label>
                                    <input className="inputLogin" type="text" name="name" placeholder="Name" required
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <input className="inputLogin" type="text" name="name" placeholder="Surname" required
                                        onChange={e => setSurname(e.target.value)}
                                    />
                                    <input className="inputLogin" type="text" name="nickname" placeholder="Nickname" required
                                        onChange={e => setNickname(e.target.value)}
                                    />
                                    <input className="inputLogin" type="number" name="name" placeholder="Age" required
                                        onChange={e => setAge(e.target.value)}
                                    />
                                    <input className="inputLogin" type="text" name="name" placeholder="Email address" required
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <input className="inputLogin" type="password" name="name" placeholder="Password" required
                                        onChange={e => setPassword(e.target.value)}
                                    />

                                    <select required name="provincia" className="form-control" onChange={e => setLocation(e.target.value)}  >
                                        <option value="">Elige Provincia</option>
                                        <option value="Álava/Araba">Álava/Araba</option>
                                        <option value="Albacete">Albacete</option>
                                        <option value="Alicante">Alicante</option>
                                        <option value="Almería">Almería</option>
                                        <option value="Asturias">Asturias</option>
                                        <option value="Ávila">Ávila</option>
                                        <option value="Badajoz">Badajoz</option>
                                        <option value="Baleares">Baleares</option>
                                        <option value="Barcelona">Barcelona</option>
                                        <option value="Burgos">Burgos</option>
                                        <option value="Cáceres">Cáceres</option>
                                        <option value="Cádiz">Cádiz</option>
                                        <option value="Cantabria">Cantabria</option>
                                        <option value="Castellón">Castellón</option>
                                        <option value="Ceuta">Ceuta</option>
                                        <option value="Ciudad Real">Ciudad Real</option>
                                        <option value="Córdoba">Córdoba</option>
                                        <option value="Cuenca">Cuenca</option>
                                        <option value="Gerona/Girona">Gerona/Girona</option>
                                        <option value="Granada">Granada</option>
                                        <option value="Guadalajara">Guadalajara</option>
                                        <option value="Guipúzcoa/Gipuzkoa">Guipúzcoa/Gipuzkoa</option>
                                        <option value="Huelva">Huelva</option>
                                        <option value="Huesca">Huesca</option>
                                        <option value="Jaén">Jaén</option>
                                        <option value="La Coruña/A Coruña">La Coruña/A Coruña</option>
                                        <option value="La Rioja">La Rioja</option>
                                        <option value="Las Palmas">Las Palmas</option>
                                        <option value="León">León</option>
                                        <option value="Lérida/Lleida">Lérida/Lleida</option>
                                        <option value="Lugo">Lugo</option>
                                        <option value="Madrid">Madrid</option>
                                        <option value="Málaga">Málaga</option>
                                        <option value="Melilla">Melilla</option>
                                        <option value="Murcia">Murcia</option>
                                        <option value="Navarra">Navarra</option>
                                        <option value="Orense/Ourense">Orense/Ourense</option>
                                        <option value="Palencia">Palencia</option>
                                        <option value="Pontevedra">Pontevedra</option>
                                        <option value="Salamanca">Salamanca</option>
                                        <option value="Segovia">Segovia</option>
                                        <option value="Sevilla">Sevilla</option>
                                        <option value="Soria">Soria</option>
                                        <option value="Tarragona">Tarragona</option>
                                        <option value="Tenerife">Tenerife</option>
                                        <option value="Teruel">Teruel</option>
                                        <option value="Toledo">Toledo</option>
                                        <option value="Valencia">Valencia</option>
                                        <option value="Valladolid">Valladolid</option>
                                        <option value="Vizcaya/Bizkaia">Vizcaya/Bizkaia</option>
                                        <option value="Zamora">Zamora</option>
                                        <option value="Zaragoza">Zaragoza</option>
                                    </select>

                                    <textarea name="description"  cols="30" name="description" rows="10"
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                    <input type="file" id="avatar" name="avatar" name="image" accept="image/png, image/jpeg" 
                                        onChange={e => setImage({selectedFile:e.target.files[0]})}
                                    />

                                    <button type="submit">Registrar</button>
                                </div>
                            </form>
                        )}
                    </div> 
                </section>
            </section>
        </main>
        
    );    
}

export default withRouter(Login)
