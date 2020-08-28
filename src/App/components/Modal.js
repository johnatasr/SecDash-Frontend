import React from 'react';
import { Modal, Button } from 'react-bootstrap'

export default function ModalComp({title, body, handleShow, handleClose, handleFunction, arg }) {
   
    return (
      <>
        <Modal show={handleShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>
            {
              arg == false && handleFunction == null ?
                <div></div>
                : arg === false ?
                  <Button onClick={() => handleFunction()}>
                    Sim
                  </Button>
                  :
                  <Button  onClick={() => handleFunction(arg)}>
                    Sim
                  </Button>
            }
            
            <Button onClick={handleClose}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }