import React from 'react';

export default class OtherBtn extends React.Component {
    constructor(props){
        super(props)
        // このコンポーネント内で使うメソッドのthisの向き先を、このクラスに限定する
        this.handleModalOpen = this.handleModalOpen.bind(this);
    }
    // このコンポーネントで定義したメソッドの中で、propsで渡って来たメソッドを実行する
    // そうすることで、親コンポーネントで定義したメソッドにイベントが通知することができる
    handleModalOpen(){
        this.props.callBackModalOpen();
    }
    render (){
        return (
            <button className="c-btn" onClick={this.handleModalOpen}>他のアプリを見る</button>
        );
    }
}