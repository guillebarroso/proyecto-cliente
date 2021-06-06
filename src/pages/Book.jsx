import React, {SyntheticEvent, useState} from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Book = (props) => {
    const [instrument_Id, setInstrumentId] = useState('');
    const [costumer_id, setCostumerId] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaDev, setFechaDev] = useState('');
    const [instruments, setInstruments] = useState([])
    const [fechasOcupadas, setFechasOcupadas] = useState([]);

    useEffect(() => {
        (
            async () => {
                debugger
                axios.all([
                    await axios({
                        method: 'post',
                        url: 'http://localhost:80/api/user/instruments',
                        withCredentials: true,
                        data: {
                            "user_id": 1
                        }
                    }),
                    await axios({
                        method: 'get',
                        url: 'http://localhost:80/api/dates/rentedInstrument/1',
                        withCredentials: true,
                    })               
                ]).then(axios.spread((data1, data2)=> {setInstruments(data1.data); procesarFechas(data2.data)}));
            }
        )();
    }, []);


    const reservar = async (e) => {
        e.preventDefault();
        debugger
        console.log(startDate);
        console.log(endDate);
        procesarDatos(startDate, endDate)
        
        // await axios({
        //     method: 'post',
        //     url: 'http://localhost:80/api/rent/instrument',
        //     withCredentials: true,
        //     data: {
        //         "owner_id": props.id,
        //         "instrument_id": instrument_Id,
        //         "customer_id": 2,
        //         "initial_date": fechaInicio,
        //         "return_date": fechaDev
        //     }
        //   });

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

    const procesarDatos = (x, y) => {
        debugger

        let prueba5 = "";
        for (let dia = new Date(x); y <= new Date(y); dia.setDate(dia.getDate() + 1)) {
            prueba5 = new Date(dia);
            prueba5.setHours(0, 0, 0, 0);            
            console.log(prueba5);
            
            console.log(prueba5);
            console.log(fechasOcupadas);

            for (let x = 0; y <= fechasOcupadas.length; x++) {
                if (fechasOcupadas[0].getTime() == prueba5.getTime){
                    console.log("por fin");
                }
            }

            // fechasOcupadas.forEach(fecha => {
            //     console.log(fecha);
            //     if (fecha.getTime() == prueba5.getTime){
            //         console.log("por fin");
            //     }
                
                
            // });

        }

        






        // let prueba = x;

        // prueba.setHours(0);            
        // prueba.setMinutes(0);
        // prueba.setSeconds(0);
        // prueba.setMilliseconds(0);

        // var isoDateString = prueba.toISOString();
        // let prueba2 = new Date(isoDateString)
        // console.log(prueba2);

        // for (let i = 0; i < fechasOcupadas.length; i++) {
        //     let dd = new Date(fechasOcupadas[i]).getTime();
        //     let ddd = new Date(prueba2).getTime();
        //     console.log(dd);
        //     console.log(ddd);
        //     if(dd == ddd){
        //         console.log('funciona');
        //     }
            
        // }
 
        // for (let i = x; i <= y; i.setDate(i.getDate() + 1)) {
        //     let prueba = i;

        //     prueba.setHours(0);            
        //     prueba.setMinutes(0);
        //     prueba.setSeconds(0);
        //     prueba.setMilliseconds(0);

        // var isoDateString = prueba.toISOString();
        // let prueba2 = new Date(isoDateString)
        // console.log(prueba2);
        //     if (fechasOcupadas.includes(prueba2)) {
        //         console.log("funciona");
                
        //     }            
            
        // }
    };

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
        <main>
            {console.log(instruments)}
            {console.log(fechasOcupadas)}
            <header>
                <h2 className="">Gestionar reserva</h2>
                <h3>Hola {props.name}! ¿Quién será el afortunado que pueda disfrutar de tu instrumento?</h3>
            </header>
            
            <section>
                <form onSubmit={reservar}>
                    <div className="login_prueba">

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

                        {/* <input className="inputLogin" type="datetime-local" required
                            onChange={e => setFechaInicio(e.target.value)}
                        />
                        <input className="inputLogin" type="datetime-local" required
                            onChange={e => setFechaDev(e.target.value)}
                        /> */}
                        
                        <select onChange={e => setInstrumentId(e.target.value)}>
                                <option></option>
                            {instruments.map(item =>
                                <option className="visible" value={item.id}>{item.name}</option>                                    
                    
                            )}
                        </select>
                        <button type="submit">Confirmar</button>
                    

                        {/* <footer>
                            <img className="logoRegistro" src="assets/img/logoSharevolume-04.png" alt="Logo de Share Volume"/>
                            <p>Nos alegra tenerte entre nosotros ;)</p>            
                            <img className="logoRegistro" src="assets/img/logoSharevolume-04.png" alt="Logo de Share Volume"/>
                        </footer> */}
                    </div>

                </form>
            </section>
        </main>
    );
}

export default Book
