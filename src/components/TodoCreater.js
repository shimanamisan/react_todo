import React from 'react';
import ClassNames from 'classnames'

export default class TodoCreator extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      val: '',
      validError: false,
      errMsg: ''
    };
    // 自分で作成したメソッドはthisの束縛を行う
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  handleChange(e){
    this.setState({
      val: e.target.value
    });
  }
  handleKeyUp(e){
    if(e.keyCode === 13 && e.shiftKey === true){
      const val = e.target.value;
      if(!val){
        this.setState({
          errMsg: '入力必須です',
          validError: true
        });
        return;
      }
      // 正常に追加された場合は、フォームの値とエラーメッセージを空にし、エラー通知用のフラグを戻す
      this.setState({
        val: '',
        errMsg: '',
        validError: false
      });
      // 親コンポーネントに追加されるタスクの文字列を渡している
      this.props.callBackAddTask(val);
    }
  }
  render() {
    const classNameForm = ClassNames({
      "c-form c-form__create": true,
      "c-valid__error": this.state.validError
    });
    
    const errMsg = (this.state.errMsg) ? 
    <div className="c-valid__wrapp">
      <span className="c-valid">{this.state.errMsg}</span> 
    </div>
    : 
    '';

    return (
       
        <div>
            <input 
              type="text"
              value={this.state.val}
              onChange={this.handleChange} 
              onKeyUp={this.handleKeyUp} 
              placeholder="Shift + Enter でタスクを追加します"
              className={classNameForm}
            />
            {errMsg}
        </div>
    );
  }
}