import React from 'react';
import Square from './Square'

export default class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // fillメソッドは指定した開始から終了インデックスまでの値を変更した配列を返す
            // ここでは開始・終了インデックスを指定していないので、配列の値が全て null の配列が返ってくる
            squares: Array(9).fill(null)
        }
    }

    handleClick(i){
        const squares = this.state.squares.slice();
        squares[i] = "X";
        this.setState( {squares: squares })
    }

    renderSquare(i) {
      // JavaScript が return の後にセミコロンを挿入するのを防ぐため、カッコを付け加えている
      return (
            <Square 
                value={this.state.squares[i]} 
                onClick={() => this.handleClick(i)}
            />
            );
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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