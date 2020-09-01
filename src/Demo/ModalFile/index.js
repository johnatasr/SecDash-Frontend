import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'

import HostServices from '../../services/hostsServices'


export default class ModalCompFiles extends Component {
    
    constructor(){
        super();
        this.state = {
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
        
            await hostServices.importCSV(formdata);

            this.setState({
                msg: 'Arquivo salvo com sucesso, recarregue a página para obter todas informações',
                msgColor: '#04a9f5'
            })
          

        }
        catch (error) {
            this.setState({
                msg: 'Falha ao importar, verifique se o arquivo CSV está nos padrões para importação',
                msgColor: '#f50404'
            })
        }
    }
        
    render() {
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
                      <div className="row" style={{marginTop: 0,}}>
                          <div className="col-xs-5" style={{marginRight: 5, height: 320, marginLeft: 200}}>
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
                                          <button type="button" href="/static/media/file_model/asset_vulnerability.csv" className="btn btn-success"
                                            style={{border: null, marginTop: 10, width: '80%', marginLeft: 30}}>Baixar
                                              modelo</button>
                                      </a>
                                  </div>
                              </div>
                              <div className="row" styles={{marginLeft: 10}}>
                                <small style={{fontSize: 12, marginLeft: 1, color: "black"}}>
                                    Acompanhe o histórico de importações pelo Admin do portal.
                                </small>
                              </div>
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
