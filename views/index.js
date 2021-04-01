import React from "react";
import Chart from "./chart";
import Table from "./table";
import Bullets from "./bullets";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: false, isLoaded: false, tab: 0, nextTab: 0, bullets: [], chart: {}, list: []};
    
    this.switchTab = this.switchTab.bind(this);
  }

  /**
   * Switching tab
   */
  switchTab(e) {
    let tab = e.target.getAttribute('data-tab');
    this.setState({nextTab: tab}, ()=>{
      this.fetchData(tab);
    });
  }

  /**
   * Loading data from API call
   */
  fetchData(tab) {
    this.setState({isLoading: true}, ()=> {
      fetch("http://localhost:9000/chart/"+(tab))
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoading: false,
              tab: tab,
              nextTab: tab,
              isLoaded: true,
              bullets: result.bullets,
              chart: result.chart,
              list: result.list
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
      )
    });
  }

  componentDidMount() {
    this.fetchData(this.state.tab);
  }

  render() {
    const tabsNumbers = [0,1,2,3];
    let Tabs = tabsNumbers.map((n)=>{
      let TabStyle = "";
      if(this.state.isLoading && this.state.nextTab==n) TabStyle = "strong";
      return <button key={"map"+n} data-tab={n} type="button" className={(n==this.state.tab?"active":"")+" "+TabStyle} onClick={this.switchTab}>Tab #{n+1}</button>;
    });
    
	  return(
      <div className="container">
        <h1>Vulnerability Data</h1>
        <div className="content-container">
          <div className="content-data">
            <h2>CHART {parseInt(this.state.tab)+1}</h2>
            <Chart chart={this.state.chart} isLoading={this.state.isLoading}></Chart>
            <Table list={this.state.list} isLoading={this.state.isLoading}></Table>
          </div>
          <div className="content-info">
            <div className="tabs">{Tabs}</div>
            <Bullets bullets={this.state.bullets} isLoading={this.state.isLoading}></Bullets>
          </div>
        </div>
      </div>  
	  )
  }
}