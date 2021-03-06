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

            if (( response.status == 200 || response.status == 201 ) && response.data.loaded == true){

                if ( response.data.length === 0) {
                    this.setState({data: []})
                    return
                }

                let severitylow = response.data.severitylow;
                let severityMedium = response.data.severityMedium;
                let severityHigh = response.data.severityHigh;
                let severityCritical = response.data.severityCritical;

                let list_vulne = [ 
                    severitylow.length, 
                    severityMedium.length, 
                    severityHigh.length, 
                    severityCritical.length
                ]
    
                let lengthMin = Math.min( ...list_vulne );
    
                for (let i = 0; i < severitylow.length; i++) {
                    baixa.push({
                        'x': severitylow[i].title,
                        'y': severitylow[i].cvss
                    });
                }
                
                for (let i = 0; i < severityMedium.length; i++) {
                    media.push({
                        'x': severityMedium[i].title,
                        'y': severityMedium[i].cvss
                    });
                }
    
                for (let i = 0; i < severityHigh.length; i++) {
                    alta.push({
                        'x': severityHigh[i].title,
                        'y': severityHigh[i].cvss
                    });
                }
    
                for (let i = 0; i < severityCritical.length; i++) {
                    critico.push({
                        'x': severityCritical[i].title,
                        'y': severityCritical[i].cvss
                    });
                }
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