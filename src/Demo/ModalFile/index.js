import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'

import HostServices from '../../services/hostsServices'


export default class ModalCompFiles extends Component {
    
    constructor(){
        super();
        this.state = {
            filesList: [],
            alert: false,
            msgAlert: '',
            loaded: false,
            file: null,
            msg: 'Formatos de arquivo aceito: csv',
            msgColor: '#7c7c7c'
        }
        this.handleUpload = this.handleUpload.bind(this)
    }


    handleFile(e){
        let file = e.target.files[0]
        this.setState({file : file})
    }


    async handleUpload(){
        try {
            const hostServices = new HostServices();

            this.setState({
                msg: 'Carregando ... ',
                msgColor: '#04a9f5'
            })


            let file = this.state.file

            const formdata = new FormData();
            formdata.append('file', file)
        
            let response = await hostServices.importCSV(formdata);

        
            if (response == true) {
                this.setState({
                    msg: 'Arquivo salvo com sucesso !',
                    msgColor: '#04a9f5'
                })
            } else {
                this.setState({
                    msg: 'Arquivo não salvo',
                    msgColor: '#f50404'
                })
            }

        }
        catch (error) {
            this.setState({
                msg: 'Falha ao importar, verifique se o arquivo CSV está nos padrões para importação',
                msgColor: '#f50404'
            })
        }
    }

    async getAllfiles(){
        const hostServices = new HostServices();
            try {
                this.setState({
                    alert: true,
                    msgAlert: 'Carregando ...',
                })
                
                let response = await hostServices.listFilesCSV();
    
                if ( response != false ) {

                    if ( response.data.loaded == true ) {
                        this.setState({
                            alert: false,
                            msgAlert: '',
                            filesList: response.data,
                            loaded: true
                        })
                    }
                    else {
                        this.setState({
                            alert: true,
                            msgAlert: 'Nehum registro encontrado',
                            filesList: [],
                            loaded: true
                        })
                    }


                } else {
                    this.setState({
                        loaded: true,
                        msgAlert: "Não foi possível carregar"
                    })
                }     
            }
            catch (error) {
                this.setState({
                    loaded: true,
                    msgAlert: "Não foi possível carregar"
                })
            }
        } 
        
    render() {

        // if ( this.props.show === true ){
        //     this.getAllfiles()
        // }



        return (
            <>
              <Modal
                  {... this.props}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
              >
                  <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                          Envio por CSV
                      </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <div className="row" style={{marginTop: 0}}>
                          <div className="col-xs-5" style={{marginRight: 5, height: 320, marginLeft: 15}}>
                              <h4 className="modal-title"
                                  style={{color: 'black', textAlign: 'center', fontSize: 18, marginBottom: 5, paddingBottom: 5}}>
                                  Enviar novo arquivo
                              </h4>
      
                              <label style={{color: 'black', marginTop: 15}}>Selecionar o arquivo.CSV</label>
                              <input type="file" id="file1" 
                                    onChange={(e) => this.handleFile(e)}
                                    style={{
                                      borderRadius: 5, 
                                      height: 36, 
                                      padding: 10,
                                      marginLeft: 15,
                                      width: '85%',
                                      height: '40%'}}
      
                                  className="form-control" name="file" required />
                              <small style={{fontSize: 12, marginLeft: 1, color: this.state.msgColor}}>
                                  {this.state.msg}
                              </small>
                              <div className="row" styles={{marginLeft: 10}}>
                                  <div className="col-xs-6">
                                      <button type="button" className="btn btn-primary"
                                            onClick={this.handleUpload}
                                            style={{border: null, marginTop: 10, width: '100%', marginLeft: 20}}>Enviar</button>
                                  </div>
                                  <div className="col-xs-6">
                                      <a
                                          href="">
                                          <button type="button" className="btn btn-success"
                                              style={{border: null, marginTop: 10, width: '80%', marginLeft: 30}}>Baixar
                                              modelo</button>
                                      </a>
                                  </div>
                              </div>
                          </div> 
                          
                          <div className="col-xs-4" style={{width: '45%', height: 320, overflowY: 'scroll'}}>
                              <div className="row">
                                  <h4 className="modal-title"
                                      style={{color: 'black', textAlign: 'center', fontSize: 18, marginBottom: 5, paddingBottom: 5, marginLeft: 25}}>
                                      Histórico de importações
                                  </h4>
                              </div>
                              
                              {
                                  this.state.alert ?
                                      <div className="row"><h3>{this.state.msgAlert}</h3></div>
                                      :
                                      this.state.filesList.map((item, index) => {
                                          return (
                                              <>
                                                  <div className="row" style={{marginLeft: 20}}>
                                                      <h4 style={{color: 'black', marginBottom: 8,}}>
                                                          Nome arquivo: {item.title}
                                                      </h4>
                                                  </div>
                                                  <div className="row">
                                                      <div className="col" style={{marginLeft: 20}}>
                                                          <small style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
                                                              Data de envio: 
                                                          </small>
                                                      </div>
                                                      <div className="col">
                                                          <small style={{fontSize: 15}} id="updateColorSmall">
                                                              {item.date}
                                                          </small>
                                                      </div>
                                                  </div>
                                                  <div className="row" style={{marginLeft: 20}}>    
                                                      <small style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>                                                         
                                                          Status de envio:         
                                                      </small>
      
                                                      { item.staus === 'E' ?
                                                          <small style={{fontSize: 15, marginLeft: 10}}>
                                                              Erro - Arquivo fora do padrão!
                                                          </small> 
                                                          : item.status === 'R' ?
                                                              <small style={{fontSize: 15, marginLeft: 10}}>
                                                                  Em processamento!
                                                              </small> 
                                                              : item.status === 'F' ?
                                                                  <small style={{fontSize: 15, marginLeft: 10}}>
                                                                      Concluído com sucesso!
                                                                  </small>
                                                                  :
                                                                  <div></div> 
                                                      }      
                                                  </div>
      
                                                  <div className="row" style={{marginLeft: 20, marginBottom: 20}}>
                                                      <small style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
                                                          Exceções:
                                                      </small>
      
                                                      {
                                                          item.exceptions_file != null || item.exceptions_file != undefined ?
                                                              <a href="">
                                                                  <small style={{fontSize: 15, marginTop: 10, marginLeft: 5}}>
                                                                      <i className="fa fa-download"></i>
                                                                          Baixar arquivo com exceções
                                                                  </small >
                                                              </a>
                                                              :
                                                              <small style={{fontSize: 15, marginLeft: 5, color: '#e32620'}}>
                                                                  Não possui arquivo de exceções
                                                              </small> 
                                                      }
                                                  </div>   
                                              </>
                                          )}
                                      ) 
                                     
                              }
                          </div>
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                  </Modal.Footer>
              </Modal>
            </>
          );
    }
    
}
