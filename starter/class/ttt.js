const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.makeMove = this.makeMove.bind(this);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', this.testCommand);
    Screen.addCommand('up', 'up command ', this.moveUp);
    Screen.addCommand('down', 'down command ', this.moveDown);
    Screen.addCommand('right', 'right command ', this.moveRight);
    Screen.addCommand('left', 'left command ', this.moveLeft);
    Screen.addCommand('o', 'player 1 piece ', this.makeMove);
    Screen.addCommand('x', 'player 2 piece ', this.makeMove);



    Screen.message =`${this.playerTurn}'s move`
    Screen.render();
    this.cursor.setBackgroundColor()
  }


     moveUp(){
      this.cursor.resetBackgroundColor()

      this.cursor.up()
      this.cursor.setBackgroundColor()
      Screen.render()

    }
     moveDown(){
      this.cursor.resetBackgroundColor()

      this.cursor.down()
      this.cursor.setBackgroundColor()
      Screen.render()

    }
     moveLeft(){

      this.cursor.resetBackgroundColor()
      this.cursor.left()
      this.cursor.setBackgroundColor()
      Screen.render()

    }
     moveRight(){
      this.cursor.resetBackgroundColor()

      this.cursor.right();
      this.cursor.setBackgroundColor()
      Screen.render();

    }

    makeMove() {



      const endGame = this.endGame.bind(this);
      const checkWin = this.checkWin.bind(this);




      if (this.grid[this.cursor.row][this.cursor.col] === ' ') {
          // Set the cell with the player's letter ('O' or 'X')
          const playerLetter = (this.playerTurn === 'O') ? 'O' : 'X';
          this.grid[this.cursor.row][this.cursor.col] = playerLetter;

          // Bind setGrid method to the current instance of Screen
          const setGrid = Screen.setGrid.bind(Screen);

          // Call the setGrid method to update the grid
          setGrid(this.cursor.row, this.cursor.col, playerLetter);

          // Inform the player about the move

          Screen.message =`Player ${this.playerTurn} placed their piece at (${this.cursor.row}, ${this.cursor.col})`;

          // Update the screen to reflect the move

          Screen.render();



          // Switch player turn
          this.playerTurn = (this.playerTurn === 'O') ? 'X' : 'O';
      } else {
          // Inform the player that the cell is already taken
          console.log('This cell is already taken. Please choose another one.');
      }

      if(checkWin(this.grid)!== false) endGame(checkWin(this.grid))
      Screen.message =`${this.playerTurn}'s move`

  }


  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  checkWin(grid) {

      let i =0;
      let j=0;

      for(let row =0; row<grid.length;row++){


        if((grid[row][j] === grid[row][j+1]) && (grid[row][j+2] === grid[row][j])){

         if(grid[row][j]!==' ') return grid[row][j]
        }
      }

      for(let col =0; col<grid.length;col++){


        if(grid[i][col] === grid[i+1][col] && grid[i][col] === grid[i+2][col]){

          if(grid[i][col] !== ' ') return grid[i][col]

        }
      }

      if(grid[i][j] === grid[i+1][j+1] && grid[i][j] === grid[i+2][j+2]){

        if(grid[i][j]!==' ') return grid[i][j]
      }
      if(grid[i+2][j] === grid[i+1][j+1] && grid[i+2][j] === grid[i][j+2]){

        if(grid[i+2][j]!==' ') return grid[i+2][j]
      }

      let tie = true;
      for(let i =0;i<grid.length;i++){

        for(let j =0;j<grid.length;j++){

          if(grid[i][j] === ' '){
            tie = false
            break
          }

        }
      }
      return (tie)?'T':false




    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

  }

  endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
