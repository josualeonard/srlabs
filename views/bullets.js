import React from "react";

export default class Bullets extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let Bullets = this.props.bullets.map((val,i)=>{
            return <div key={"bullet"+i}><i className={"fas "+val.icon}></i><div dangerouslySetInnerHTML={{__html: val.text}}></div></div>;
        });
        return(
            <div className={"bullets"+(this.props.isLoading?" loading":"")}>
                <h3>This graph shows that:</h3>
                {Bullets}
            </div>
        );
    }
}