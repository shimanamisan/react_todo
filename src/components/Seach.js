import React from 'react';

export default class Search extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      val: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    this.setState({
      val: e.target.value
    });
    this.props.callBackSearch(e.target.value);
  }
  render() {
    return (
      <div >
        <input type="text" className="c-form c-form__search" type="text" placeholder="リストを検索" onChange={this.handleChange}
              value={this.state.val} placeholder="somothing keyword" />
        <i className="fas fa-search c-form__search__icon"/>
      </div>
    );
  }
}