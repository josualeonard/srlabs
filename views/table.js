import React from "react";

export default class Table extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          sort: 'name',
          sortDirection: true,
          importanceFilter: "all",
          scoreFilter: 0
      }

      this.filterByImportance = this.filterByImportance.bind(this);
      this.filterByScore = this.filterByScore.bind(this);
      this.sortByName = this.sortByName.bind(this);
      this.sortByScore = this.sortByScore.bind(this);
  }

  /**
   * Filter data by importance
   */
  filterByImportance(e) {
      this.setState({importanceFilter: e.target.value});
  }

  /**
   * Filter data by score
   */
  filterByScore(e) {
    let score = parseInt(e.target.value);
    if(score<0 || isNaN(score)) score = 0;
    this.setState({scoreFilter: score});
  }

  /**
   * Sort data by name
   */
  sortByName(e) {
    e.preventDefault();
    this.setState({
      sort: "name",
      sortDirection: this.state.sort!="name"?true:!this.state.sortDirection
    });
  }

  /**
   * Sort data by score
   */
  sortByScore(e) {
    e.preventDefault();
    this.setState({
      sort: "score",
      sortDirection: this.state.sort!="score"?true:!this.state.sortDirection
    });
  }

  render() {
    let totalScores = 0;
    this.props.list.sort((a, b) => {
      if(this.state.sort=="score") {
        if(this.state.sortDirection) return a.score-b.score;
        return b.score-a.score;
      }
      if(this.state.sortDirection) return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
    let count = 0;
    let List = this.props.list.map((val,i)=>{
      if(val.score<=this.state.scoreFilter) return null;
      if(this.state.importanceFilter!="all") {
        if(this.state.importanceFilter=="important" && !val.important) return null;
        else if(this.state.importanceFilter=="not-important" && val.important) return null;
      }
      count++;
      totalScores += val.score;
      return <div key={"item"+i} className={"data-item "+(val.important?"important":"")}>
        <div className="data-column">{val.name}</div>
        <div className="data-column">{val.score}</div>
      </div>;
    });
    let Footer = null;
    if(count<=0) {
      Footer = <div className="data-no-results">
        No results found <i className="fas fa-frown"></i>
      </div>;
    }

    let SortNameIcon = null;
    let SortScoreIcon = null;

    if(this.state.sort=="name"){
      SortNameIcon = <i className={"fas fa-sort-alpha-"+(this.state.sortDirection?"down":"up")}></i>;
    } else if(this.state.sort=="score"){
      SortScoreIcon = <i className={"fas fa-sort-alpha-"+(this.state.sortDirection?"down":"up")}></i>;
    }

    return(
      <div className={this.props.isLoading?"loading":""}>
        <div className="actions">
          <div className="action-left">
            <label htmlFor="filter-by-importance">&nbsp;</label>
            <select id="filter-by-importance" onChange={this.filterByImportance}>
              <option value="all">Show all</option>
              <option value="important">Show only important</option>
              <option value="not-important">Show only not important</option>
            </select>
          </div>
          <div className="action-right">
            <label htmlFor="filter-by-score">With score above:</label>
            <input id="filter-by-score" type="number" min="0" max="100" onKeyUp={this.filterByScore}></input>
          </div>
        </div>
        <div className="data-table">
          <div className="data-header">
            <a href="#" id="data-sort-name" className="data-column" onClick={this.sortByName}>Name {SortNameIcon}</a>
            <a href="#" id="data-sort-score" className="data-column" onClick={this.sortByScore}>Score {SortScoreIcon}</a>
          </div>
          <div className="data-body">
            {List}
          </div>
          {Footer}
        </div>
    </div>);
  }
}