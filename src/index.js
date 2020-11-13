import "particles.js/particles";
const particlesJS = window.particlesJS;
particlesJS.load("js-particles", "./particles.json", function () {
  console.log("callback - particles.js config loaded");
});

import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
import './scss/style.scss';
 
// 中括弧を使うとエクスポート元のファイルでクラスが複数あった場合に、読み込むクラスを指定できる
// さらに as を使うことで読み込んだクラスに別名をつけてコンポーネントとして使用できる
// import { Todo as sample } from 'TodoComponent';
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
          text: 'sample todo1',
          isDone: false
        },
        {
          id: this.createHashId(),
          text: 'sample todo2',
          isDone: false
        },
        {
          id: this.createHashId(),
          text: 'sample todo3',
          isDone: false
        }
      ],
      searchText: ''
    };
    // 自分で作成したメソッドは、thisの向き先を自分自身のクラスにするためにbindメソッドを使って束縛する（そうしないとエラーになる）
    this.callBackRemoveTask = this.callBackRemoveTask.bind(this);
    this.callBackAddTask = this.callBackAddTask.bind(this);
    this.callBackDone = this.callBackDone.bind(this);
    this.callBackText = this.callBackText.bind(this);
    this.callBackSearch = this.callBackSearch.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
  }
  // todoリストのユニークなIDを作成するメソッド
  createHashId(){
    return Math.random().toString(36).slice(-16);
  }
  // Searchコンポーネントのテキストボックスの値をstateに格納するメソッド
  callBackSearch(val) {
    this.setState({
      searchText: val
    });
  }
  // isDoneを変更するメソッド
  callBackDone(id){
    console.log("孫コンポーネントから通知されました： " + id)
    let newItem = this.state.data.map( item => { // mapメソッドは新しい配列を返す
        // 子コンポーネントから渡って来たidと同じタスクだった場合は下記の処理を行う
        if(item.id === id){
          // 第一引数で空のオブジェクトを生成
          // 第二引数で配列から分解されたオブジェクトをセット
          // 第三引数でオブジェクト内のプロパティを分割代入？
          return Object.assign({} , item, {isDone: !item.isDone})
        }
        // 違うidだった場合は、mapで分解された要素をそのまま返却する
        return item
    })
    console.log(newItem)

    // 新しいオブジェクトをセットする
    this.setState({
      data: newItem
    })
  }
  // タスクを削除するメソッド
  callBackRemoveTask(id){
    // lodash のrejectメソッドを使用して、第一引数にオブジェクトを指定して、
    // 第二引数に指定した値や関数を繰り返し実行した値を返す
    let data = _.reject(this.state.data, { 'id': id });
    this.setState({
      data: data
    });
  }
  // タスクを追加するメソッド
  callBackAddTask(val){
    let nextData = this.state.data;
    nextData.push({
      id: this.createHashId(),
      text: val,
      isDone: false
    });
    this.setState({
      data: nextData
    });
  }
  // 編集したテキストを更新するメソッド
  callBackText(id, val){
    // console.log("渡って来ている：" + id  + "  " + val)
    let newVal = this.state.data.map( item =>{
        if(item.id === id){
          return Object.assign({}, item, {text : val})
        }
        return item;
    })
    console.log(newVal)
    this.setState({
      data: newVal
    })

  }

  filterCollection(elm){
    const regexp = new RegExp('^' + this.state.searchText, 'i');
    return (elm.text.match(regexp));
  }

  render() {

    const data = (this.state.searchText) ? this.state.data.filter(this.filterCollection) : this.state.data;
    

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

        <TodoList 
          data={data}
          callBackRemoveTask={this.callBackRemoveTask}
          callBackDone={this.callBackDone}
          callBackText={this.callBackText}
          />

      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);
