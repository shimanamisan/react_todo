import React from 'react';
import Square from './Square'

export default class Board extends React.Component {
    // Gameコンポーネントに状態管理を移動した
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         // fillメソッドは指定した開始から終了インデックスまでの値を変更した配列を返す
    //         // ここでは開始・終了インデックスを指定していないので、配列の値が全て null の配列が返ってくる
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     }
    // }

    // handleClick(i) {
    //     const squares = this.state.squares.slice();
    //     if (calculateWinner(squares) || squares[i]) {
    //       return;
    //     }
    //     squares[i] = this.state.xIsNext ? 'X' : 'O';
    //     this.setState({
    //       squares: squares,
    //       xIsNext: !this.state.xIsNext,
    //     });
    //   }

    renderSquare(i) {
      // JavaScript が return の後にセミコロンを挿入するのを防ぐため、カッコを付け加えている
      return (
            <Square 
                value={this.props.squares[i]} 
                thatClick={() => this.props.propClick(i)}
            />
            );
    }
  
    render() {
        return (
          <div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
    }
}