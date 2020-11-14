import React from 'react';
import ClassNames from 'classnames';
import Icon from '../common/Icon'
import vueicon from '../../img/vue_logo.svg'

export default class Modal extends React.Component {
    constructor(props){
        super(props)
        // このコンポーネント内で使うメソッドのthisの向き先を、このクラスに限定する
        this.handleModal = this.handleModal.bind(this);
    }
    // このコンポーネントで定義したメソッドの中で、propsで渡って来たメソッドを実行する
    // そうすることで、親コンポーネントで定義したメソッドにイベントが通知することができる
    handleModal(){
        this.props.callBackModalClose();
    }
    render (){
        const classNameModal = ClassNames({
            "c-modal": true,
            "u-modal": this.props.modalFlg
        })
        const classNameModalBG = ClassNames({
            "c-modal__bg" : true,
            "u-modal": this.props.modalFlg
        })
        return (
            <div>
                <div className={classNameModal}>
                    <div className="close icon" onClick={this.handleModal}></div>
                    <div className="c-modal__body">
                    <li className="c-modal__body__list">
                        <Icon/>
                        <div>
                        <p>Vue.js todo list</p>
                        </div>
                    </li>
                    <li className="c-modal__body__list">
                        {/* <IconLogo :icon-path="this.jquery_path" /> */}
                        <div>
                        <p>jQuery todo list</p>
                        </div>
                    </li>
                    <li className="c-modal__body__list">
                        {/* <IconLogo :icon-path="this.react_path" /> */}
                        <div>
                        <p>React.js todo list</p>
                        </div>
                    </li>
                    </div>
                </div>
                <div className={classNameModalBG}></div>
            </div>
        );
    }
}