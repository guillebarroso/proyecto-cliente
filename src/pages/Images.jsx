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

  let { instrumentid } = useParams();

  const [modalIsOpen,setIsOpen] = useState(false);  
  const [images, setImages] = useState([])
  const [image, setImage] = useState("")
  const [prueba, setprueba] = useState(true)

  const obtenerDatos = async () => {
    await axios({
      method: 'get',
      url: 'http://localhost:80/api/images/'+instrumentid,
      withCredentials: true,
      }).then(response => {
        setImages(response.data);
    });
  }  

  useEffect(() => {
    if(prueba){
        obtenerDatos()
    }
    return () => {
        setprueba(false);
    };
    
  },[]);

  function openModal(x) {
    setImage(x)
    setIsOpen(true);
  }


  function closeModal(){
    setIsOpen(false);
  }
  return (
    <main>
      <h2 className="loginTitle">Galería de imágenes</h2>
      <section className="gallery-container">
        {console.log(images)}
        {images.map(item =>
        <div className="gallery-card">
            <img onClick={()=>openModal('http://localhost:80/api/instrument/images/' + item.image_path)} className="gallery-thumbnail" src={'http://localhost:80/api/instrument/images/' + item.image_path} alt="Instrumento"></img>                    
        </div>            
        )}

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        >
          <i className="fas fa-window-close" id="gallery-close" onClick={closeModal}></i>
          <img className="modal-img" src={image} alt="imagen de la galeria"/>

        </Modal>

      </section>
    </main>
  )
}

export default Images
