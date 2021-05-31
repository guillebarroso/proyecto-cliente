import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router";
import Modal from 'react-modal';


const Images = () => {

    const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(21,21,21,.75)'
          },
        content:{
          top:'50%',
          left:'50%',
          right:'auto',
          bottom:'auto',
          marginRight:'-50%',
          padding:'0',
          transform:'translate(-50%, -50%)',
          maxHeight:'90%',
          maxWidth:'90%',
          display: 'flex',
        //   alignItems: 'center',
        //   justifyContent: 'center'
        }
    };

    var subtitle;

    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal(x) {
        setImage(x)
    setIsOpen(true);
    }


    function closeModal(){
    setIsOpen(false);
    }

    let { instrumentid } = useParams();
    const [images, setImages] = useState([])
    const [image, setImage] = useState("")

    useEffect(() => {
        (
            async () => {
                await axios({
                    method: 'get',
                    url: 'http://localhost:80/api/images/'+instrumentid,
                    withCredentials: true,
                  }).then(response => {
                    setImages(response.data);
                  });
            }
        )();
    }, []);



    return (
        <div className="gallery-container">
            {console.log(images)}
            {images.map(item =>
            <div className="gallery-card">
                {/* poner aqui estilo de que width 100 y hight 100 */}
                <img onClick={()=>openModal('http://localhost:80/api/instrument/images/' + item.image_path)} className="gallery-thumbnail" src={'http://localhost:80/api/instrument/images/' + item.image_path} alt="Instrumento"></img>
                        
            </div>            
            )   
            }

        {/* <button onClick={openModal}>Open Modal</button> */}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <i className="fas fa-window-close" id="prueba5" onClick={closeModal}></i>
          <img className="prueba4" src={image} alt="" />

        </Modal>
        </div>
    )
}

export default Images
