import React from 'react';
import {Row, Col, Card, Table, Pagination} from 'react-bootstrap';

import HostServices from '../../services/hostsServices'

import Aux from "../../hoc/_Aux";

class BootstrapTable extends React.Component {
    constructor(){
        super();
        this.state = {
            page: 1,
            rowPerpage: 50,
            activePage: 1,
            listHosts: [],
            loading: true,
            msg: 'Carregando ...',
            tableLenght: 0,
            title: ''
        }    
    }

    async componentDidMount() {
        try {
            const hostServices = new HostServices();
            
            let response = await hostServices.listHost();

            if ( response != false ) {
                this.setState({
                    loading: false,
                    listHosts: response.data.hostsList,
                })

                let lengthRows = response.data.hostsList.length;

                this.setState({tableLenght: lengthRows})
            }
        }
        catch(error){
            this.setState({msg: 'Não foi possível carregar tabela'})
        }

    }


    paginate(number) {
        this.setState({
            page: number,
            activePage: number
        })                     
    }

    render() {
    
        let items = [];
        const indexOfLastRows = parseInt(this.state.page) * this.state.rowPerpage;
        const indexOfFirstRows = indexOfLastRows - this.state.rowPerpage;
        const currentRows = this.state.listHosts.slice(indexOfFirstRows, indexOfLastRows);

        for (let number = 1; number <= Math.ceil(this.state.tableLenght / this.state.rowPerpage); number++) {
            items.push(
              <Pagination.Item key={number} active={number === this.state.activePage} onClick={() => this.paginate(number)}>
                {number}
              </Pagination.Item>,
            );
        }

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Listagem Host / Vulnerabilidade</Card.Title>
                            </Card.Header>
                            <Card.Body>

                                { this.state.loading ? 
                                    <div className='row align-items-center justify-content-center' ><h3>{this.state.msg}</h3></div>
                                    :  this.props.searchList.length === 0 ?
                                        <Table responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Hostname</th>
                                                    <th>Endereço IP</th>
                                                    <th>Vulnerabilidade</th>
                                                    <th>Severidade</th>
                                                    <th>CVSS</th>
                                                    <th>Data Publicação</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { currentRows.map((item, index) => (
                                                                
                                                        <tr key={index}>
                                                            <th scope="row">{item.hostname}</th>
                                                            <td>{item.ip_adress}</td>
                                                            <td>{item.title}</td>
                                                            <td>{item.severity}</td>
                                                            <td>{item.cvss}</td> 
                                                            <td>{item.publication_date}</td> 
                                                        </tr>                             
                                                    
                                                ))}
                                            </tbody>
                                        </Table>
                                    :  

                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>Hostname</th>
                                                <th>Endereço IP</th>
                                                <th>Vulnerabilidade</th>
                                                <th>Severidade</th>
                                                <th>CVSS</th>
                                                <th>Data Publicação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { this.props.searchList.map((item, index) => (
                                                            
                                                    <tr key={index}>
                                                        <th scope="row">{item.hostname}</th>
                                                        <td>{item.ip_adress}</td>
                                                        <td>{item.title}</td>
                                                        <td>{item.severity}</td>
                                                        <td>{item.cvss}</td> 
                                                        <td>{item.publication_date}</td> 
                                                    </tr>                             
                                                        
                                                ))}
                                        </tbody>
                                    </Table>      
                                }     
                            </Card.Body>
                        </Card>

                        {
                            this.props.searchList.length === 0 ?
                                <Pagination>   
                                    {items}
                                </Pagination>
                            :
                            <div></div>     
                        }
                        
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default BootstrapTable;