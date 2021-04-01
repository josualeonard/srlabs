import React from "react";
import Chartist from "chartist";

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Update chart
     */
    componentDidUpdate() {
        let highest = 0;
        if(this.props.chart.data) {
            let data = this.props.chart.data.series;
            for(let i=0;i<data.length;i++) {
                for(let j=0;j<data[i].length;j++) {
                    if(highest<data[i][j]) highest = data[i][j];
                }
            }
        }

        var options = {
            seriesBarDistance: 10,
            high: highest+20,
            axisY: {
                offset: 20
            }
        };
            
        let responsiveOptions = [
            ['screen and (max-width: 720px)', {
                seriesBarDistance: 10,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];
        
        new Chartist.Bar('#chart', this.props.chart.data, options, responsiveOptions);
    }

    render() {
        return(
            <div id="chart" className={this.props.isLoading?"loading":""}></div>
        );
    }
}