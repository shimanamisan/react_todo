import React from 'react';
import Task from './Task';

export default class TodoList extends React.Component {

  constructor(props){
    super(props);
    // 親から渡ってきたメソッドを孫コンポーネトに渡すメソッドを定義
    this.handleRemove = this.handleRemove.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleText = this.handleText.bind(this);
  }
  handleRemove(id){
    // 孫コンポーネントで実行された関数よりデータを受け取り
    // 親からpropsで渡ってきたメソッドを実行して親にデータを受け渡す
    this.props.callBackRemoveTask(id);
  }
  handleDone(id){
    // 親へクリックされた要素のidを通知
    this.props.callBackDone(id)
  }
  handleText(id, val){
    this.props.callBackText(id, val)
  }
  render() {
    let tasks = [];
    for(let i in this.props.data){
      tasks.push(<Task key={this.props.data[i].id}
                       id={this.props.data[i].id}
                       text={this.props.data[i].text}
                       isDone={this.props.data[i].isDone}
                       onRemove={this.handleRemove}
                       onHandleDone={this.handleDone}
                       onHandleText={this.handleText}
                       />
                );
    }

    return (
      <ul className="p-task__list">
        {tasks}
      </ul>
    );
  }
}