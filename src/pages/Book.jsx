import React, {SyntheticEvent, useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { useParams } from "react-router";


const Book = (props) => {
    let { instrumentid } = useParams();
    const [instrument_Id, setInstrumentId] = useState('');
    const [costumer_id, setCostumerId] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaDev, setFechaDev] = useState('');
    const [instruments, setInstruments] = useState([])
    const [fechasOcupadas, setFechasOcupadas] = useState([]);
    const [users, setUsers] = useState([]);

    //Mirar si está bien que cualquier usuario pueda entrar y ver las fechas
    //Poner if props vacio que lo redirija a otra zona


    useEffect(() => {
        (
            async () => {
                debugger
                axios.all([
                    //Mirar esto. Porque el instrumento, el id, se lo doy en la nueva pagina de mis isntrumentos
                    // await axios({
                    //     method: 'post',
                    //     url: 'http://localhost:80/api/user/instruments',
                    //     withCredentials: true,
                    //     data: {
                    //         "user_id": 1
                    //     }
                    // }),
                    await axios({
                        method: 'get',
                        url: 'http://localhost:80/api/dates/rentedInstrument/' + instrumentid,
                        withCredentials: true,
                    }),
                    await axios({
                        method: 'post',
                        url: 'http://localhost:80/api/chat/info',
                        withCredentials: true,
                        data: {
                            "user_id": 1
                        }
                    })            
                ]).then(axios.spread((data2, data3)=> {procesarFechas(data2.data); setUsers(data3.data)}));
            }
        )();
    }, []);


    const reservar = async (e) => {
        e.preventDefault();
        debugger
        console.log(moment(startDate.toString).format);
        console.log(endDate);
        console.log(moment(endDate).format());
        console.log(moment(startDate).format);
        console.log(generateDateToday(startDate));
        console.log(generateDateToday(endDate));
        
        console.log(endDate.toString);
        // procesarDatos(startDate, endDate)
        await axios({
            method: 'post',
            url: 'http://localhost:80/api/rent/instrument',
            withCredentials: true,
            data: {
                "owner_id": props.id,
                "instrument_id": instrumentid,
                "customer_id": costumer_id,
                "initial_date": generateDateToday(startDate),
                "return_date": generateDateToday(endDate),
            }
            }).then((response) => console.log(response.data));

    }

    function generateDateToday(d){
        var year = d.getFullYear();
        var month = ("0" + (d.getMonth() + 1)).slice(-2);
        var day = ("0" + d.getDate()).slice(-2);
        var hour = ("0" + d.getHours()).slice(-2);
        var minutes = ("0" + d.getMinutes()).slice(-2);
        var seconds = ("0" + d.getSeconds()).slice(-2);
        return year + "-" + month + "-" + day + " "+ hour + ":" + minutes + ":" + seconds;
    }

    const procesarFechas = (x) => {
        debugger
        let prueba = []
        for (let y = 0; y < x.length; y++) {
            for (let i = new Date(x[y].initial_date); i <= new Date(x[y].return_date); i.setDate(i.getDate() + 1)) {
                prueba.push(new Date(i));               
            }            
        }
        setFechasOcupadas(prueba)
        
    };

    // const procesarDatos = (x, y) => {
    //     debugger

    //     let prueba5 = "";
    //     for (let dia = new Date(x); y <= new Date(y); dia.setDate(dia.getDate() + 1)) {
    //         prueba5 = new Date(dia);
    //         prueba5.setHours(0, 0, 0, 0);            
    //         console.log(prueba5);
            
    //         console.log(prueba5);
    //         console.log(fechasOcupadas);

    //         for (let x = 0; y <= fechasOcupadas.length; x++) {
    //             if (fechasOcupadas[0].getTime() == prueba5.getTime){
    //                 console.log("por fin");
    //             }
    //         }
    //     }   
    // };

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        console.log(startDate);
        console.log(endDate);       
    };



    return (
        <main className="book">
            {console.log(instruments)}
            {console.log(fechasOcupadas)}

            <h2 className="loginTitle">Gestionar reserva</h2>
            
            <section>
                <h3>Hola {props.name}! ¿Quién será el afortunado que pueda disfrutar de tu instrumento?</h3>

                <form onSubmit={reservar}>
                    <div className="book-data">

                        <ReactDatePicker
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        excludeDates={fechasOcupadas}
                        monthsShown={2}
                        selectsRange
                        inline
                        />

                        {/* <select className="book-select" onChange={e => setInstrumentId(e.target.value)}>
                                <option></option>
                            {instruments.map(item =>
                                <option className="visible" value={item.id}>{item.name}</option>                                    
                    
                            )}
                        </select> */}
                        <select className="book-select" onChange={e => setCostumerId(e.target.value)}>
                                <option></option>
                            {users.map(item =>
                                <option className="visible" value={item.id}>{item.name}</option>                                    
                    
                            )}
                        </select>
                        <button type="submit">Confirmar</button>                    

                    </div>
                </form>
            </section>
        </main>
    );
}

export default Book
