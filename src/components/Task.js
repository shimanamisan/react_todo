import React from 'react';
import ClassNames from 'classnames';

export default class Task extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      // text: this.props.text,
      // isDone: this.props.isDone,
      // propsをstateに渡すと、props元の親コンポーネントでプロパティが更新されてもstateの反映されないので注意（https://ja.reactjs.org/docs/react-component.html）
      editMode: false
    };
    this.handleClickToggleDone = this.handleClickToggleDone.bind(this); // タスク完了用メソッド
    this.handleClickRemove = this.handleClickRemove.bind(this); // タスクを削除するメソッド（親から渡ってきた関数を内部で実行）
    this.handleClickshowEdit = this.handleClickshowEdit.bind(this); // 編集用テキストフォームを表示
    this.handleKeyUpCloseEdit = this.handleKeyUpCloseEdit.bind(this); // 編集用テキストフォームを閉じる処理
    this.handleChangeText = this.handleChangeText.bind(this); // 
    this.handleBlurCloseEdit = this.handleBlurCloseEdit.bind(this) // 
  }

  handleBlurCloseEdit(e){
    console.log(e.currentTarget.value)
    this.setState({
      text: e.currentTarget.value,
      editMode: false
    });
  }
  // このメソッドもプロパティの更新を親コンポーネントに通知する
  handleChangeText(e){
    // this.setState({
    //   text: e.target.value
    // });
    
    // 親に変更後の値を通知
    this.props.onHandleText(this.state.id, e.target.value)
  }
  handleClickToggleDone () {
    // setStateのなかで、前のstateを使いたい場合はfunctionを渡す
    // Reactの特徴として、引数に前のステートのプロパティが必ず入ってくる
    // その関数の中でstateを変更する処理を書いて、前のステートを元に状態の更新が行われる
    // this.setState(prevState => ({
    //   isDone: !prevState.isDone
    // }));

    // 上記のやり方だと子コンポーネントだけで状態変化を行っているので、検索をした際にisDone状態が外れる
    // 親のコンポーネントに通知してisDone状態を変更してやることで、子コンポーネントにも変更が反映される
    this.props.onHandleDone(this.state.id)
  }
  handleClickRemove() {
    // 親から渡ってきた関数を実行することで、親へどのitemを削除するのか通知する
    // onRemoveは独自に設定しているので別名でも可能
    this.props.onRemove(this.state.id);

    // 自身で削除できなくもない
    // 直接DOMを指定して書き換えるようなやり方はやらない方が良い
    // $(e.target).parent('.list__item').remove();
  }
  handleClickshowEdit() {
    this.setState({
      editMode: true
    });
  }
  handleKeyUpCloseEdit(e) {
    // エンターキーとシフトキーが押されたら処理を実行
    // イベント内にキーコードを格納した情報が入っている
    if(e.keyCode === 13 && e.shiftKey === true){
      console.log(e.currentTarget)
      this.setState({
        text: e.currentTarget.value,
        editMode: false
      });
    }
  }
  render() {
    // reactにはclassを付け替えする機能はないので、外部ライブラリを使う
    const classNameLi = ClassNames({
      'p-task__item': true,
      'p-task__item--isDone': this.props.isDone
    });
    const classNameIcon = ClassNames({
      'c-form__check': true,
      'far': true,
      'fa-circle': !this.props.isDone,
      'fas fa-check-circle': this.props.isDone,
    });
    const classNameText = ClassNames({
      "p-task__item--isDoneText" : this.props.isDone,
    });
    // underscoreのようなif文は使えないので、変数に前もって入れておく
    const input = (this.state.editMode) ?
      <input type="text" className="c-form c-form__edit" value={this.props.text}
            onChange={this.handleChangeText}
            onKeyUp={this.handleKeyUpCloseEdit}
            onBlur={this.handleBlurCloseEdit}
      />
            :
      <div className="p-task__item__wrapp">
        <span 
          onClick={this.handleClickshowEdit}
          className="p-task__item__text"
          className={classNameText}
        > 
          {this.props.text}
        </span>
      </div>;

    // HTML要素を返す（お決まりの書き方）
    // jsxでのクラスの書き方は className を使う
    // イベントハンドラは素のJavaScriptと同じ発火方法
    return (
      <li className={classNameLi}>
        <i className={classNameIcon} onClick={this.handleClickToggleDone} />
        {input}
        <i className="fas fa-trash-alt p-task__trash" onClick={this.handleClickRemove} aria-hidden="true" />
      </li>
    );
  }
}
