import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Profile = (props) => {

    const [userInfo, setUserInfo] = useState([])
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [age, setAge] = useState("")
    const [nickname, setNickname] = useState("")
    const [image, setImage] = useState("")
    const [location, setLocation] = useState("")
    const [description, setDescription] = useState("")
    const [prueba, setprueba] = useState(true)
    const [newImage, setNewImage] = useState([]);



    const obtenerDatos = async () => {
        debugger

        if(props.id === "visitor" || props.id === undefined){
            props.history.push('/login');
        }
        
        if (props.id != "") {
            try{
                await axios({
                    method: 'post',
                    url: 'http://localhost:80/api/user/info',
                    withCredentials: true,
                    data: {
                        "user_id": props.id
                    }
                    // COmprobar si esti viene vacio
                }).then(response => {
                    console.log(response.data[0]);
                    setUserInfo(response.data[0]);
                    setName(response.data[0][0].name);
                    setSurname(response.data[0][0].surname);
                    setAge(response.data[0][0].age);
                    setNickname(response.data[0][0].nickname);
                    setDescription(response.data[0][0].description);
                    setImage(response.data[0][0].image);
                    setLocation(response.data[0][0].location);
                });
            }catch{
                alert("Hay un error, contacte con el administrador de la web")
            }   
            
        }
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

    const editarDatos = async (e) => {
        debugger
        e.preventDefault();
        await axios({
        method: 'post',
        url: 'http://localhost:80/api/update/user/' + props.id,
        withCredentials: true,
        data: {
            "name": name,
            "surname": surname,
            "age": age,
            "nickname": nickname,
            "location": location,
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
        url: 'http://localhost:80/api/update/user/image/' + props.id,
        headers: {
            "Content-Type": "multipart/form-data",
            },
        withCredentials: true,
        data: data3
        }).then((response) => {
            console.log(response.data);
            setImage(response.data);
          });
    }

    const deleteUser = async (e) => {
        debugger
        e.preventDefault();
        await axios({
            method: 'delete',
            url: 'http://localhost:80/api/delete/user/' + props.id,
            withCredentials: true,
            }).then((response) => {
                props.setName("");
                props.setId("");
                console.log(response.data);
                cookies.remove('id', { path: '/' });
                props.history.push("/");
            });       
    }

    return (
        <main className="profile">
            {console.log(name)}
            <h2 className="loginTitle">Hola {name}, ¿qúe quieres hacer?</h2>
            <section className="profile-sections">
                <div className="profile-section">
                    <h3>Ver mis instrumentos</h3>
                    <Link to={"/myinstruments"}><i class="fas fa-music"></i></Link>
                </div>
                <div className="profile-section">
                    <h3>Subir intrumento</h3>
                    <Link to={"/upload"}><i class="fas fa-upload"></i></Link>                 
                </div>
                <div className="profile-section">
                    <h3>Ir a algún chat</h3>
                    <Link to={"/details/chat"}><i class="fas fa-comments"></i></Link>               
                </div>
            </section>
            <h2 className="loginTitle">Aquí también puedes editar tu perfil</h2> 
            <section className="profile-edit">                               
                <div className="profile-img-edit">
                    <div className="profile-img-shw">
                        <img src={'http://localhost:80/api/avatar/' + image} alt="Imagen de perfil"/>
                    </div>
                    <form onSubmit={editarImagen}>
                        <input type="file" name="file" id="file" accept="image/png, image/jpeg" onChange={e => setNewImage({selectedFile:e.target.files[0]})}></input>
                        <button className="button" type="submit">Editar imagen</button>
                    </form>
                </div>
                
                <form onSubmit={editarDatos}>
                    <div className="profile-data-edit">
                        <div class="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" class="form-control" id="name" name="name" value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <label htmlFor="surname">Apellidos:</label>
                            <input type="text" class="form-control" id="surname" name="surname" value={surname} onChange={e => setSurname(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <label htmlFor="age">Edad:</label>
                            <input type="number" class="form-control" id="age" name="age" value={age} onChange={e => setAge(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <label htmlFor="nickname">Nickname:</label>
                            <input type="text" class="form-control" id="nickname" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <label htmlFor="location">Localización:</label>
                            <input type="text" class="form-control" id="location" name="location" value={location} onChange={e => setLocation(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <label htmlFor="description">Descripción:</label>
                            <textarea class="form-control" id="description" name="description" value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>
                        <div className="button-group">
                            <button className="button" type="submit">Editar datos</button>
                        </div>
                    </div>
                </form>
                
            </section>

            <section className="danger">
                <div>
                    <h2>Dangerous Zone</h2>
                </div>

                <form>
                    <div className="button-group">
                        <button onClick={deleteUser} type="submit">Eliminar tu cuenta</button>
                    </div>
                </form>
            </section>
            

        </main>
    )
}

export default withRouter(Profile)
