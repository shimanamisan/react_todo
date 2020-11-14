import React from 'react';

export default class DeleteBtn extends React.Component {
    constructor(props){
        super(props)
        // このコンポーネント内で使うメソッドのthisの向き先を、このクラスに限定する
        this.handleisDoneAllDelete = this.handleisDoneAllDelete.bind(this);
    }
    // このコンポーネントで定義したメソッドの中で、propsで渡って来たメソッドを実行する
    // そうすることで、親コンポーネントで定義したメソッドにイベントが通知することができる
    handleisDoneAllDelete(){
        this.props.callBackisDoneAllDelete();
    }
    render (){
        return (
            <button
                className="c-btn"
                onClick={this.handleisDoneAllDelete}
            >完了タスクを消去
            </button>
        );
    }
}