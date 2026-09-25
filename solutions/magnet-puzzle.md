# Magnet Puzzle

> Source: https://www.techiedelight.com/magnet-puzzle/

We are given a set of bipolar magnets, each domino-shaped. The objective is to place magnets on an `M × N` board, which satisfies a set of conditions where both `M` and `N` are not odd.

For instance, the following problem has the solution on its right:

Each `2 × 1` or `1 × 2` grid in the board can contain a magnet or empty. The blank entry will be indicated by `X's`, and the magnet will be represented by `+` and `-` (For the positive and negative end, respectively). The digits along the board’s left and top sides represent the count of `+` squares in corresponding rows or columns. Similarly, those along the right and bottom show the total number of `-` signs in particular rows or columns. Rows and columns for which no number is mentioned can have any number of `+` or `-` signs. The puzzle solution must also satisfy the constraint that no two adjacent squares can have the same sign. But diagonally joined squares can have the same sign.

**Examples:** _Here,`top[]`, `bottom[]`, `left[]`, `right[]` arrays indicates the count of `+` or `-` along the top (+), bottom (-), left (+), and right (-) edges, respectively. The value of -1 indicate any number of `+` or `-` signs._

The `rules[][]` matrix can contain any `T`, `B`, `L`, or `R` character. `T` indicates its top end for a vertical slot in the board, and `B` indicates the bottom end. `L` indicates the left end, and `R` indicates the right end for a horizontal slot in the board.

**Input:** top[] = [1, -1, -1, 2, 1, -1] bottom[] = [2, -1, -1, 2, -1, 3] left[] = [2, 3, -1, -1, -1] right[] = [-1, -1, -1, 1, -1] Rules[][] = [L R L R T T] [L R L R B B] [T T T T L R] [B B B B T T] [L R L R B B] **Output:** \+ – + – X – – + – + X + X X + – + – X X – + X + – + X X X – **Input:** top[] = [2, -1, -1] bottom[] = [-1, -1, 2] left[] = [-1, -1, 2, -1] right[] = [0, -1, -1, -1] Rules[][] = [T T T] [B B B] [T L R] [B L R] **Output:** \+ X + – X – \+ – + – + –

> 

The idea is to use [backtracking](https://techiedelight.com/backtracking-interview-questions/). We start from the first cell of the rules matrix and check for every horizontal and vertical slot. If the horizontal or vertical slot contains `L` and `R` or `T` and `B`, respectively, put `('+', '-')` or `('-', '+')` accordingly in the slot and recursively checks if they lead to the solution or not. If the solution is found with the required configuration, print the solution matrix; if none of the above solutions work, return false from the function.

Following is a TypeScript implementation of the idea:

```ts
let M = 0;
let N = 0;

// Utility function to print solution
function printSolution(board: string[][]): void {
    for (let i = 0; i < M; i++) {
        console.log(board[i].join(' '));
    }
}

// Utility function to count the total number of characters `ch` in current column `j`
function countInColumns(board: string[][], ch: string, j: number): number {
    let count = 0;
    for (let i = 0; i < M; i++) {
        if (board[i][j] === ch) {
            count++;
        }
    }
    return count;
}

// Utility function to count the total number of characters `ch` in current row `i`
function countInRow(board: string[][], ch: string, i: number): number {
    let count = 0;
    for (let j = 0; j < N; j++) {
        if (board[i][j] === ch) {
            count++;
        }
    }
    return count;
}

// Function to check if it is safe to put `ch` at `board[row][col]`
function isSafe(board: string[][], row: number, col: number, ch: string,
                top: number[], left: number[], bottom: number[], right: number[]): boolean {

    // check for adjacent cells
    if ((row - 1 >= 0 && board[row - 1][col] === ch) ||
            (col + 1 < N && board[row][col + 1] === ch) ||
            (row + 1 < M && board[row + 1][col] === ch) ||
            (col - 1 >= 0 && board[row][col - 1] === ch)) {
        return false;
    }

    // count character `ch` in the current row
    const rowCount = countInRow(board, ch, row);

    // count character `ch` in the current column
    const colCount = countInColumns(board, ch, col);

    // if the given character is `+`, check `top[]` and `left[]`
    if (ch === '+') {

        // check top
        if (top[col] !== -1 && colCount >= top[col]) {
            return false;
        }

        // check left
        if (left[row] !== -1 && rowCount >= left[row]) {
            return false;
        }
    }

    // if the given character is `-`, check `bottom[]` and `right[]`
    if (ch === '-') {

        // check bottom
        if (bottom[col] !== -1 && colCount >= bottom[col]) {
            return false;
        }

        // check left
        if (right[row] !== -1 && rowCount >= right[row]) {
            return false;
        }
    }

    return true;
}

// Function to validate the configuration of an output board
function validateConfiguration(board: string[][], top: number[], left: number[],
                            bottom: number[], right: number[]): boolean {

    // check top
    for (let i = 0; i < N; i++) {
        if (top[i] !== -1 && countInColumns(board, '+', i) !== top[i]) {
            return false;
        }
    }

    // check left
    for (let j = 0; j < M; j++) {
        if (left[j] !== -1 && countInRow(board, '+', j) !== left[j]) {
            return false;
        }
    }

    // check bottom
    for (let i = 0; i < N; i++) {
        if (bottom[i] !== -1 && countInColumns(board, '-', i) !== bottom[i]) {
            return false;
        }
    }

    // check right
    for (let j = 0; j < M; j++) {
        if (right[j] !== -1 && countInRow(board, '-', j) !== right[j]) {
            return false;
        }
    }

    return true;
}

// The main function to solve the Bipolar Magnets puzzle
function solveMagnetPuzzle(board: string[][], row: number, col: number,
                            top: number[], left: number[], bottom: number[],
                            right: number[], rules: string[][]): boolean {

    // if the last cell is reached
    if (row >= M - 1 && col >= N - 1) {
        return validateConfiguration(board, top, left, bottom, right);
    }

    // if the last column of the current row is already processed,
    // go to the next row, the first column
    if (col >= N) {
        col = 0;
        row = row + 1;
    }

    // if the current cell contains `R` or `B` (end of horizontal
    // or vertical slot), recur for the next cell
    if (rules[row][col] === 'R' || rules[row][col] === 'B') {

        if (solveMagnetPuzzle(board, row, col + 1, top, left, bottom, right, rules)) {
            return true;
        }
    }

    // if the horizontal slot contains `L` and `R`
    if (rules[row][col] === 'L' && rules[row][col + 1] === 'R') {

        // put (`+`, `-`) pair and recur
        if (isSafe(board, row, col, '+', top, left, bottom, right) &&
                isSafe(board, row, col + 1, '-', top, left, bottom, right)) {
            board[row][col] = '+';
            board[row][col + 1] = '-';

            if (solveMagnetPuzzle(board, row, col + 2, top, left, bottom, right, rules)) {
                return true;
            }

            // if it doesn't lead to a solution, backtrack
            board[row][col] = 'X';
            board[row][col + 1] = 'X';
        }

        // put (`-`, `+`) pair and recur
        if (isSafe(board, row, col, '-', top, left, bottom, right) &&
                isSafe(board, row, col + 1, '+', top, left, bottom, right)) {
            board[row][col] = '-';
            board[row][col + 1] = '+';

            if (solveMagnetPuzzle(board, row, col + 2, top, left, bottom, right, rules)) {
                return true;
            }

            // if it doesn't lead to a solution, backtrack
            board[row][col] = 'X';
            board[row][col + 1] = 'X';
        }
    }

    // if the vertical slot contains `T` and `B`
    if (rules[row][col] === 'T' && rules[row + 1][col] === 'B') {

        // put (`+`, `-`) pair and recur
        if (isSafe(board, row, col, '+', top, left, bottom, right) &&
                isSafe(board, row + 1, col, '-', top, left, bottom, right)) {
            board[row][col] = '+';
            board[row + 1][col] = '-';

            if (solveMagnetPuzzle(board, row, col + 1, top, left, bottom, right, rules)) {
                return true;
            }

            // if it doesn't lead to a solution, backtrack
            board[row][col] = 'X';
            board[row + 1][col] = 'X';
        }

        // put (`-`, `+`) pair and recur
        if (isSafe(board, row, col, '-', top, left, bottom, right) &&
                isSafe(board, row + 1, col, '+', top, left, bottom, right)) {
            board[row][col] = '-';
            board[row + 1][col] = '+';

            if (solveMagnetPuzzle(board, row, col + 1, top, left, bottom, right, rules)) {
                return true;
            }

            // if it doesn't lead to a solution, backtrack
            board[row][col] = 'X';
            board[row + 1][col] = 'X';
        }
    }

    // ignore the current cell and recur
    if (solveMagnetPuzzle(board, row, col + 1, top, left, bottom, right, rules)) {
        return true;
    }

    // if no solution is possible, return false
    return false;
}

function magnetPuzzle(top: number[], left: number[], bottom: number[],
                    right: number[], rules: string[][]): void {

    // `M × N` matrix
    M = rules.length;
    N = rules[0].length;

    // to store the result
    // initialize all cells by `X`
    const board: string[][] = Array.from({ length: M }, () => Array(N).fill('X'));

    // start from `(0, 0)` cell
    if (!solveMagnetPuzzle(board, 0, 0, top, left, bottom, right, rules)) {
        console.log('Solution does not exist');
        return;
    }

    // print result if the given configuration is solvable
    printSolution(board);
}

// indicates the count of `+` or `-` along the top (+), bottom (-),
// left (+), and right (-) edges, respectively.
// value of -1 indicate any number of `+` or `-` signs
const top = [1, -1, -1, 2, 1, -1];
const bottom = [2, -1, -1, 2, -1, 3];
const left = [2, 3, -1, -1, -1];
const right = [-1, -1, -1, 1, -1];

// rules matrix
const rules = [
    ['L', 'R', 'L', 'R', 'T', 'T'],
    ['L', 'R', 'L', 'R', 'B', 'B'],
    ['T', 'T', 'T', 'T', 'L', 'R'],
    ['B', 'B', 'B', 'B', 'T', 'T'],
    ['L', 'R', 'L', 'R', 'B', 'B']
];

magnetPuzzle(top, left, bottom, right, rules);
```
**Output:** \+ – + – X – – + – + X + X X + – + – X X – + X + – + X X X –

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

This question is taken from – <https://people.eecs.berkeley.edu/~hilfingr/programming-contest/f2012-contest.pdf>

Also See:

> [Generate a list of possible words from a character matrix](https://www.techiedelight.com/generate-list-of-possible-words-from-a-character-matrix/ "Generate a list of possible words from a character matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.7/5. Vote count: 179

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
