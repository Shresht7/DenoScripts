
//  Type Definitions
//  ----------------

enum CellState {
    DEAD,
    ALIVE
}

//  ================
//  HELPER FUNCTIONS
//  ================

//  CLEAR SCREEN
//  ------------

/** Clears the entire terminal */
function clearScreen() {
    Deno.stdout.write(new TextEncoder().encode('\u001b[2J'))
}

//  MOVE CURSOR
//  -----------

/** Move cursor to given row and column */
function cursorMoveTo(r: number, c: number) {
    return `\u001b[${r};${c}H`
}

//  MAKE 2D ARRAY
//  -------------

/** Creates a 2-dimensional array */
function make2DArray(rows: number, columns: number, randomize?: boolean): number[][] {

    //  Initialize a 2D array
    const arr = new Array(columns)
    for (let c = 0; c < arr.length; c++) {
        arr[c] = new Array(rows)
    }

    //  Randomize values in the array
    if (randomize) {
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows; r++) {
                arr[c][r] = Math.floor(Math.random() * 2)   //  Either 0 or 1
            }
        }
    }

    return arr
}

//  ====
//  GRID
//  ====

/** A 2D Grid to represent the game-of-life */
class Grid {

    private rows = 80
    private columns = 120
    private GRID: number[][]

    constructor({ rows, columns, randomize }: { rows: number, columns: number, randomize?: boolean }) {
        this.rows = rows
        this.columns = columns
        this.GRID = make2DArray(this.rows, this.columns, randomize)
    }

    /** Count the number of live neighbours on the grid for given x and y positions. */
    countNeighbours(xPos: number, yPos: number): number {
        let count = 0   //  Count of live neighbours

        //  Loop over immediate neighbours
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const posX = (this.columns + xPos + i) % this.columns   //  Track X position on the gird
                const posY = (this.rows + yPos + j) % this.rows     //  Track Y position on the grid
                count += this.GRID[posX][posY]      //  Add cell's value to the count
            }
        }

        //  Subtract the center's value (it doesn't count as a neighbour)
        count -= this.GRID[xPos][yPos]

        return count
    }

    /** Evolve the grid according to the rules of the game-of-life */
    evolve() {
        const nextGen: number[][] = make2DArray(this.rows, this.columns)  //  Initialize a grid to store the state of the next generation

        for (let c = 0; c < this.columns; c++) {
            for (let r = 0; r < this.rows; r++) {

                const liveNeighbours = this.countNeighbours(c, r)   //  Get neighbour count
                const state: CellState = this.GRID[c][r]           //  Track the current state of the cell

                if (state === CellState.DEAD && liveNeighbours === 3) { //  if the cell is dead and has 3 live neighbours...
                    nextGen[c][r] = CellState.ALIVE //  ...revive the cell

                } else if (state === CellState.ALIVE && (liveNeighbours < 2 || liveNeighbours > 3)) {   //  if the cell is alive but is subjected to under or overpopulation...
                    nextGen[c][r] = CellState.DEAD  //  ...kill it

                } else {    //  Otherwise...
                    nextGen[c][r] = this.GRID[c][r]     //  ...no change in state
                }

            }
        }

        //  Move to the next generation
        this.GRID = nextGen
    }

    /** Renders the grid on the screen */
    render(char: string) {
        clearScreen()
        let str = ''
        for (let c = 0; c < this.columns; c++) {
            for (let r = 0; r < this.rows; r++) {
                if (this.GRID[c][r]) {
                    str += cursorMoveTo(r, c)
                    str += char
                }
            }
        }
        Deno.stdout.write(new TextEncoder().encode(str))
    }

}

//  ---------------
export default Grid
//  ---------------
