import React from 'react';
import ClassNames from 'classnames';
import Icon from '../common/Icon'
import vueicon from '../../img/vue_logo.svg'
import jqueryicon from '../../img/jquery_logo.svg'
import reacticon from '../../img/react_logo.svg'

export default class Modal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            vueUrl: "https://vue-task-app.shimanamisan.com",
            jQueryUrl: "https://jq-task-app.shimanamisan.com",
            reactUrl:""
        }
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
                        <Icon 
                        path={vueicon}
                        url={this.state.vueUrl}
                        />
                        <div>
                        <p>Vue.js todo list</p>
                        </div>
                    </li>
                    <li className="c-modal__body__list">
                        <Icon 
                            path={jqueryicon}
                            url={this.state.jQueryUrl}
                        />
                        <div>
                        <p>jQuery todo list</p>
                        </div>
                    </li>
                    <li className="c-modal__body__list">
                        <Icon 
                            path={reacticon}
                            url={this.state.reactUrl}
                        />
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