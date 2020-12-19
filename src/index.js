import "particles.js/particles";
const particlesJS = window.particlesJS;
particlesJS.load("js-particles", "./particles.json", function () {
  // console.log("callback - particles.js config loaded");
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
import Modal from './components/modal/Modal'


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
      searchText: '',
      modalFlg: true
    };
    // 自分で作成したメソッドは、thisの向き先を自分自身のクラスにするためにbindメソッドを使って束縛する（そうしないとエラーになる）
    this.callBackRemoveTask = this.callBackRemoveTask.bind(this);
    this.callBackAddTask = this.callBackAddTask.bind(this);
    this.callBackDone = this.callBackDone.bind(this);
    this.callBackText = this.callBackText.bind(this);
    this.callBackSearch = this.callBackSearch.bind(this);
    this.callBackisDoneAllDelete = this.callBackisDoneAllDelete.bind(this);
    this.callBackModalOpen = this.callBackModalOpen.bind(this);
    this.callBackModalClose = this.callBackModalClose.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
  }
  // todoリストのユニークなIDを作成するメソッド
  createHashId(){
    let str = "";
    let keyLength = 15;
    const key = {
      small: "abcdefghijklmnopqrstuvwxyz",
      large: "ABCDEFGHIJKLMNPQRSTUVWXYZ",
      num: "1234567890",
      symbol: "#$=", // デフォルトで定義されている'_-'の２文字を変更、'='を追加
    };
    // concatメソッドの引数に入った文字列を連結して、新しい配列に文字列して返す
    const createID = str.concat(key.small, key.large, key.num, key.symbol);
    // console.log("createID ：" + createID)
    let newId = "";
    for (let i = 0; i < keyLength; i++) {
      // console.log(" :" + typeof createID)
      // console.log(" :" + createID[6])
      // createIDにランダムに添え字を指定して文字列を取り出す
      newId += createID[Math.floor(Math.random() * createID.length)];
    }
    return newId;
  }
  // Searchコンポーネントのテキストボックスの値をstateに格納するメソッド
  callBackSearch(val) {
    this.setState({
      searchText: val
    });
  }
  // isDoneを変更するメソッド
  callBackDone(id){
    // console.log("孫コンポーネントから通知されました： " + id)
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
    // console.log(newItem)

    // 新しいオブジェクトをセットする
    this.setState({
      data: newItem
    })
  }
  // 完了済みのタスクを全て削除するメソッド
  callBackisDoneAllDelete(){
    if(window.confirm("完了したタスクを全て削除しますか？")){
      // fillter関数の中の処理で、条件が合致（trueのものだけ）した要素だけ残される
      // falseの要素は取り残されて新しい配列が返される
      // 条件に合致するものがなければ空の配列が返されれる
      let newItem = this.state.data.filter( item => {
        // console.log(!item.isDone)
        // isDoneがfalseのものだけ新しい配列として返す
        // trueのものは除去される
        return !item.isDone
      })
      this.setState({
        data: newItem
      })
    }
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
    // console.log(newVal)
    this.setState({
      data: newVal
    })
  }
  callBackModalOpen(){
    // console.log("open!!")
    this.setState({
      modalFlg: false
    })
  }
  callBackModalClose(){
    // console.log("close!")
    this.setState({
      modalFlg: true
    })
  }
  // todoリスト検索用メソッド
  filterCollection(elm){
    // console.log(elm)
    const regexp = new RegExp('^' + this.state.searchText, 'i');
    return (elm.text.match(regexp));
  }

  render() {

    const data = (this.state.searchText) ? this.state.data.filter(this.filterCollection) : this.state.data;
    

    return (
      <div>
        <Modal
        callBackModalClose={this.callBackModalClose}
        modalFlg={this.state.modalFlg}
        />

        <div className="c-form__wrapp">
          <TodoCreator callBackAddTask={this.callBackAddTask}/>
        </div>

        <div className="c-btn__wrapp">
          <DeleteBtn callBackisDoneAllDelete={this.callBackisDoneAllDelete}/>
          <OtherBtn callBackModalOpen={this.callBackModalOpen}/>
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
