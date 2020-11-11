import React from 'react';

// export default class Square extends React.Component {
//     /************************************************
//     チュートリアルを進める過程で、ゲームの状態を親コンポーネントで
//     管理するようにしたので、子コンポーネントでのコンストラクタは削除
//     *************************************************/
//     // constructor(props) {
//     //     // サブクラスのコンストラクタを定義する際には常に super を呼ぶ必要がある
//     //     // constructorをもつReactコンポーネントでは、全てのコンストラクタで super(props) から始める
//     //     super(props);
//     //     this.state = {
//     //         value: null
//     //     }
//     // }
//     render() {
//       return (
//         <button className="square" 
//         onClick={  () => this.props.onClick({value: 'X'})}>
//           {this.props.value}
//         </button>
//       );
//     }
// }

// 関数クラスに書き換えました
// this.propsは propsに書き換えた
export default function Square(props) {
    return (
      <button className="square" onClick={props.thatClick}>
        {props.value}
      </button>
    );
  }