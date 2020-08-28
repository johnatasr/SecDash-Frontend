import React from 'react';
import {Row, Col, Card} from 'react-bootstrap';

import HostServices from '../../services/hostsServices'

import Aux from "../../hoc/_Aux";
import MultiBarChart from "../Charts/Nvd3Chart/MultiBarChart";
import ChartTopTen from "../../Demo/Charts/Nvd3Chart/ChartTopTen"

const hostServices = new HostServices();

class Dashboard extends React.Component {
    constructor(){
        super();
        this.state = {
            totalHosts: 0,
            totalHostsVulne: 0,
            totalVulne: 0,
            notCorrectedVulne: 0,
            severity: 'Não definida',
            mediaCVSS: 0.0,
        }
    }


    async componentDidMount(){
        try{
            let response = await hostServices.getCards();
            
            if ( response != false ) {
                this.setState({
                    totalHosts: response.totalHosts,
                    totalHostsVulne: response.totalHostsVulne,
                    totalVulne: response.totalVulnerabilities,
                    notCorrectedVulne: response.notCorrected,
                    severity: response.severity,
                    mediaCVSS: response.mediaCVSS
                })
            } else {
                localStorage.clear(); 
                this.props.history.push('/');
            }
        }
        catch(error){
            localStorage.clear(); 
            this.props.history.push('/');
        }
    }

    render() {

        let totalHosts = this.state.totalHosts;
        let totalHostsVulne = this.state.totalHostsVulne;
        let totalVulne= this.state.totalVulne;
        let notCorrectedVulne = this.state.notCorrectedVulne;
        let severity = this.state.severity;
        let mediaCVSS = this.state.mediaCVSS;


        return (
            <Aux>
                <Row>
                    <Col md={6} xl={4}>
                        <Card className='card-event'>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col">
                                        <h5 className="m-0">Hosts</h5>
                                    </div>
                                </div>
                                <div className='row align-items-center justify-content-center'>
                                    <div className="col">
                                        <h2 className="mt-2 f-w-300">{totalHosts}<sub className="text-muted f-14">Total</sub></h2>
                                        <h6 className="text-muted mt-3 mb-0">Todos Hosts registrados</h6>
                                    </div>
                                    <div className="col">
                                        <h2 className="mt-2 f-w-300">{totalHostsVulne}<sub className="text-muted f-14">Vulneráveis</sub></h2>
                                        <h6 className="text-muted mt-3 mb-0">Hosts com vulnerabilidades</h6>
                                        <i className="fa fa-exclamation-triangle text-c-yellow f-50"/>
                                    </div>
                                </div>      
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card className='card-event'>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col">
                                        <h5 className="m-0">Vulnerabilidades</h5>
                                    </div>
                                </div>
                                <div className='row align-items-center justify-content-center'>
                                    <div className="col" style={{paddingRight: 0}}>
                                        <h2 className="mt-2 f-w-300">{totalVulne}<sub className="text-muted f-14">Total</sub></h2>
                                        <h6 className="text-muted mt-3 mb-0">Vulnerabilidades detectadas</h6>
                                    </div>
                                    <div className="col" style={{paddingLeft:0}}>
                                        <h2 className="mt-2 f-w-300">{notCorrectedVulne}<sub className="text-muted f-14">Total</sub></h2>
                                        <h6 className="text-muted mt-3 mb-0">Vulnerabilidades não corrigidas</h6>
                                        <i className="fa fa-exclamation-triangle text-c-yellow f-50"/>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card className='card-event'>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col">
                                        <h5 className="m-0">Média</h5>
                                    </div>
                                    <div className="col-auto">
                                <label className="label theme-bg2 text-white f-14 f-w-400 float-right">CVSS GERAL: {mediaCVSS}</label>
                                    </div>
                                </div>
                                <h2 className="mt-2 f-w-300" style={{paddingBottom: 13.5}}>{severity}<sub className="text-muted f-14"> para todos hosts</sub></h2>
                                <i className="fa fa-exclamation-triangle text-c-yellow f-50"/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Vulnerabilidade por severidade</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <MultiBarChart/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Hosts mais vulneráveis</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <ChartTopTen />
                            </Card.Body>
                        </Card>
                    </Col>       
                </Row>
            </Aux>
        );
    }
}

export default Dashboard;