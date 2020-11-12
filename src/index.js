import "particles.js/particles";
const particlesJS = window.particlesJS;
particlesJS.load("js-particles", "./particles.json", function () {
  console.log("callback - particles.js config loaded");
});

import React from 'react';
import ReactDOM from 'react-dom';
import './scss/style.scss';

import TodoList from './components/TodoList';
import TodoCreator from './components/TodoCreater';
import Search from './components/Seach';
import DeleteBtn from './components/DeleteBtn'
import OtherBtn from './components/OtherBtn'

class TodoApp extends React.Component {

  constructor(){
    super();
    this.state = {
      data: [
        {
          id: this.createHashId(),
          text: 'sample todo1'
        },
        {
          id: this.createHashId(),
          text: 'sample todo2'
        }
      ],
      searchText: ''
    };
    this.callBackRemoveTask = this.callBackRemoveTask.bind(this);
    this.callBackAddTask = this.callBackAddTask.bind(this);
    this.callBackSearch = this.callBackSearch.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
  }

  createHashId(){
    return Math.random().toString(36).slice(-16);
  }

  callBackSearch(val) {
    this.setState({
      searchText: val
    });
  }

  callBackRemoveTask(id){
    let data = _.reject(this.state.data, { 'id': id });
    this.setState({
      data: data
    });
  }

  callBackAddTask(val){
    let nextData = this.state.data;
    nextData.push({ id: this.createHashId(), text: val });
    this.setState({
      data: nextData
    });
  }

  filterCollection(elm){
    const regexp = new RegExp('^' + this.state.searchText, 'i');
    return (elm.text.match(regexp));
  }

  render() {

    const data = (this.state.searchText) ? this.state.data.filter(this.filterCollection) : this.state.data;
    // ただし、検索して戻すとdone状態が外れてしまう

    return (
      <div>
        <div className="c-form__wrapp">
          <TodoCreator callBackAddTask={this.callBackAddTask}/>
        </div>

        <div className="c-btn__wrapp">
          <DeleteBtn/>
          <OtherBtn/>
        </div>

        <div className="c-form__wrapp">
          <Search callBackSearch={this.callBackSearch} />
        </div>

        <TodoList data={data} callBackRemoveTask={this.callBackRemoveTask}/>

      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);
