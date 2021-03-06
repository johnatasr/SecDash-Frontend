import React from 'react';
import NVD3Chart from 'react-nvd3';
import HostServices from '../../../services/hostsServices'

class ChartTopTen extends React.Component {
    constructor(){
        super();
        this.state = {
            data: []
        }
    }

    async componentDidMount() {

        const hostServices = new HostServices();
        
        let response = await hostServices.getTopTen();
        let topTen = [];

        if ( response != false ) {

            if ( (response.status == 200 ||  response.status == 201) && response.data.loaded == true ){
                for (let i = 0; i < response.data.topTen.length; i++) {
                    topTen.push({
                        'x': response.data.topTen[i].hostname,
                        'y': response.data.topTen[i].cvssTotal
                    });
                }

                this.setState({
                    data: [
                        { values: topTen }
                    ]
                }) 
            } 
        }

        
    }
    
    render() {

        const barColor = ['#1df7b6', '#a9b7d0', '#9e8dd4', '#25a9cb', '#04a9f5'];

        return <NVD3Chart tooltip={{enabled: true}} type="discreteBarChart" datum={this.state.data} x="label" y="value" barColor={barColor} height={300} showValues />
    }
}

export default ChartTopTen;