enum Player {
  vacant,
  player1,
  player2
}


class node {
  player: Player
  connect_down_count: number
  connect_width_count: number
  right_diagonal_count: number
  left_diagonal_count: number
  
  constructor() {
    this.player = Player.vacant
    this.connect_down_count = this.connect_width_count = this.right_diagonal_count = this.left_diagonal_count = 0
  }
}



export class Connect4 {
  grid: node[];
  player1_turn: boolean;
  game_over: boolean
  constructor() {
    this.grid = new Array(42).fill(null).map(() => new node)
    this.player1_turn = true
    this.game_over = false
  }

  play(col: number): string {
    if (!this.game_over) {
      //Get the right index where the disc should fall in the grid of 7 X 6
      let index = col % 7
      while (this.grid[index].player !== Player.vacant) {
        index += 7
        if (index > 41) return 'Column full!'
      }
  
      const node = this.grid[index]
      node.player = this.player1_turn ? Player.player1 : Player.player2
      node.connect_down_count =  (index - 7 >= 0   &&   node.player === this.grid[index - 7].player)   ?   (this.grid[index - 7].connect_down_count + 1)   :   1
      
      node.right_diagonal_count = 1 
      if (index - 8 >= 0   &&   ![14, 21, 28, 35].includes(index)   &&   this.grid[index - 8].player === node.player)
        node.right_diagonal_count += this.grid[index - 8].right_diagonal_count
      if (index + 8 <= 41   &&   ![6, 13, 20, 27].includes(index)   &&   this.grid[index + 8].player === node.player) {
        node.right_diagonal_count += this.grid[index + 8].right_diagonal_count
      }
  
      node.left_diagonal_count = 1
      if (index - 6 > 0  &&  ![6, 13, 20, 27, 34, 41].includes(index)   &&   this.grid[index - 6].player === node.player)
        node.left_diagonal_count += this.grid[index - 6].left_diagonal_count
      if (index + 6 < 41 && ![0, 7, 14, 21, 28, 35].includes(index) &&  this.grid[index + 6].player === node.player)
        node.left_diagonal_count += this.grid[index +6].left_diagonal_count

      node.connect_width_count = 1
      if (![6, 13, 20, 27, 34, 41].includes(index) && this.grid[index + 1].player === node.player) 
        node.connect_width_count += this.grid[index + 1].connect_width_count
      if (![0, 7, 14, 21, 28, 35].includes(index)  && this.grid[index - 1].player === node.player)
        node.connect_width_count += this.grid[index - 1].connect_width_count
  
      
      if (node.connect_down_count === 4 || node.left_diagonal_count === 4 || node.right_diagonal_count === 4 || node.connect_width_count === 4) {
        this.game_over = true
        return 'Player ' + this.grid[index].player  + ' wins!'
      }
        
      if (this.player1_turn) {
        this.player1_turn = !this.player1_turn
        return 'Player 1 has a turn'
      } else {
        this.player1_turn = !this.player1_turn
        return 'Player 2 has a turn'
      }
    } else {
      return 'Game has finished!'
    }
    
  }
}