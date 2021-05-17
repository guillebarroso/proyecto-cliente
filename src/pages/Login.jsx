import React, {SyntheticEvent, useState} from 'react';
import axios from 'axios'


const Login = (props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');
    const [esregistro, setEsregistro] = useState(false)


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
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/register',
            withCredentials: true,
            data: {
                "name": name,
                "surname": surname,
                "age": age,
                "email": email,
                "nickname": nickname,
                "location": location,
                "password":password
            }
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
            }).then((response) => console.log(response.data));
            setEmail("")
            setPassword("")
            // setError(null)
            props.history.push('/dashboard')

        }
        catch{
            //console.log(error)
            alert("No se ha podido iniciar sesión");
            // if (error.code==="auth/user-not-found" || error.code==="auth/wrong-password") {
            //     setError("Email y/o password incorrecto")
            // }

        }      

    }


    return (
        <div className={esregistro? "registrate":"iniciaSesion"}>
            <button onClick={()=>setEsregistro(!esregistro)}>{esregistro? "Iniciar sesión":"Registrarse"}</button>
            <header>
                <h2 className="prueba">
                    {esregistro? "Registro":"Iniciar sesión"}
                </h2>
            </header>
            
            {!esregistro && (
                <section>
                    <form onSubmit={login}>
                        <div className="login_prueba">
                            <input className="inputLogin" type="text" placeholder="Email" required
                                onChange={e => setEmail(e.target.value)}            />

                            <input className="inputLogin" type="password" placeholder="Password" required
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button type="submit">Iniciar sesión</button>
                      
                            <footer>
                                <img className="logoInicio" src="assets/img/logoSharevolume-05.png" alt="Logo de Share Volume"></img>
                            </footer>
                        </div>
                    </form>
                </section>
                
            )}
            {esregistro && (
                <section>
                    <form onSubmit={registrar}>
                        <div className="login_prueba">
                            <input className="inputLogin" type="text" placeholder="Name" required
                                onChange={e => setName(e.target.value)}
                            />
                            <input className="inputLogin" type="text" placeholder="Surname" required
                                onChange={e => setSurname(e.target.value)}
                            />
                            <input className="inputLogin" type="number" placeholder="Age" required
                                onChange={e => setAge(e.target.value)}
                            />
                            <input className="inputLogin" type="text" placeholder="Email address" required
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input className="inputLogin" type="text" placeholder="Nickname" required
                                onChange={e => setNickname(e.target.value)}            
                            />
                            <input className="inputLogin" type="text" placeholder="Location" required
                                onChange={e => setLocation(e.target.value)}            
                            />
                            <input className="inputLogin" type="password" placeholder="Password" required
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button type="submit">Registrar</button>
                        

                            <footer>
                                <img className="logoRegistro" src="assets/img/logoSharevolume-04.png" alt="Logo de Share Volume"/>
                                <p>Nos alegra tenerte entre nosotros ;)</p>            
                                <img className="logoRegistro" src="assets/img/logoSharevolume-04.png" alt="Logo de Share Volume"/>
                            </footer>
                        </div>

                    </form>
            </section>
            )}
        </div>
    );
}

export default Login
