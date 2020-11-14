import React from 'react';

export default class Icon extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            url: this.props.url,
            iconPath: this.props.path
        }
    }

    render (){
        return (
            <div>
              <a href={this.state.url} target="_blank" rel="noopener"><img className="p-logo" src={this.state.iconPath} alt="TODOリストのロゴ" /></a>
            </div>
        );
    }
}