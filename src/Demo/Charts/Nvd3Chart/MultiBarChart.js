import React from 'react';
import HostServices from '../../../services/hostsServices'
import NVD3Chart from 'react-nvd3';


class MultiBarChart extends React.Component {
    constructor(){
        super();
        this.state={
            data: []
        }
    }

    async componentDidMount(){

        let baixa = [],
        media = [],
        alta = [],
        critico = [];

        const hostServices = new HostServices();
        
        let response = await hostServices.getGraphs();

        if ( response != false ) {

            let list_vulne = [ 
                response.severitylow.length, 
                response.severityMedium.length, 
                response.severityHigh.length, 
                response.severityCritical.length
            ]

            let lengthMin = Math.min( ...list_vulne );

            for (let i = 0; i < response.severitylow.length; i++) {
                baixa.push({
                    'x': response.severitylow[i].title,
                    'y': response.severitylow[i].cvss
                });
            }
            
            for (let i = 0; i < response.severityMedium.length; i++) {
                media.push({
                    'x': response.severityMedium[i].title,
                    'y': response.severityMedium[i].cvss
                });
            }

            for (let i = 0; i < response.severityHigh.length; i++) {
                alta.push({
                    'x': response.severityHigh[i].title,
                    'y': response.severityHigh[i].cvss
                });
            }

            for (let i = 0; i < response.severityCritical.length; i++) {
                critico.push({
                    'x': response.severityCritical[i].title,
                    'y': response.severityCritical[i].cvss
                });
            }
        }

        this.setState({
            data: [
                {
                    values: baixa,
                    key: 'Baixa',
                    color: '#1df7b6'
                },
                {
                    values: media,
                    key: 'Média',
                    color: '#f1f504'
                },
                {
                    values: alta,
                    key: 'Alta',
                    color: '#e9a11d',
                },
                {
                    values: critico,
                    key: 'Crítico',
                    color: '#f71d1d',
                }
            ]
        }) 
    }
    
    render() {
        return <NVD3Chart type="multiBarChart" datum={this.state.data} x="x" y="y" height={300} showValues="false" showXAxis={false} groupSpacing={0.1} />
    }
}

export default MultiBarChart;