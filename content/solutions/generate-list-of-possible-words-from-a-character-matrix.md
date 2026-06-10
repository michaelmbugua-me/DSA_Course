# Generate a list of possible words from a character matrix

> Source: https://www.techiedelight.com/generate-list-of-possible-words-from-a-character-matrix/

Given an `M × N` boggle board, find a list of all possible words that can be formed by a sequence of adjacent characters on the board.

We are allowed to search a word in all eight possible directions, i.e., North, West, South, East, North-East, North-West, South-East, South-West, but a word should not have multiple instances of the same cell.

Consider the following the traditional `4 × 4` boggle board. If the input dictionary is `[START, NOTE, SAND, STONED]`, the valid words are `[NOTE, SAND, STONED]`.

> 

We can use [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) to solve this problem. The idea is to start from each character in the matrix and explore all eight paths possible and recursively check if they lead to a solution or not. To make sure that a word doesn’t have multiple instances of the same cell, keep track of cells involved in the current path in the matrix, and before exploring any cell, ignore the cell if it is already covered in the current path.

To find all possible movements from a cell, we can use an array to store the relative position of movement from any cell. For example, if the current cell is `(x, y)`, we can move to `(x + row[k], y + col[k])` for `0 <= k <=7` using the following array:

int row[] = { -1, -1, -1, 0, 0, 1, 1, 1 } int col[] = { -1, 0, 1, -1, 1, -1, 0, 1 }

So, from position `(x, y)`, we can move to:

(x – 1, y – 1) (x – 1, y) (x – 1, y + 1) (x, y – 1) (x, y + 1) (x + 1, y – 1) (x + 1, y) (x + 1, y + 1)

The algorithm can be implemented as follows in TypeScript:

```ts
// Below arrays detail all eight possible movements from a cell
// (top, right, bottom, left, and four diagonal moves)
const row = [-1, -1, -1, 0, 1, 0, 1, 1];
const col = [-1, 1, 0, -1, -1, 1, 0, 1];

// Function to check if it is safe to go to cell (x, y) from the current cell.
// The function returns false if (x, y) is not valid matrix coordinates
// or cell (x, y) is already processed.
function isSafe(x: number, y: number, processed: boolean[][]): boolean {
    return x >= 0 && x < processed.length && y >= 0 && y < processed[0].length &&
        !processed[x][y];
}

// A recursive function to generate all possible words in a boggle
function searchBoggle(board: string[][], words: Set<string>, result: Set<string>,
                      processed: boolean[][], i: number, j: number, path = ''): void {
    // mark the current node as processed
    processed[i][j] = true;

    // update the path with the current character and insert it into the set
    path += board[i][j];

    // check whether the path is present in the input set
    if (words.has(path)) {
        result.add(path);
    }

    // check for all eight possible movements from the current cell
    for (let k = 0; k < row.length; k++) {
        // skip if a cell is invalid, or it is already processed
        if (isSafe(i + row[k], j + col[k], processed)) {
            searchBoggle(board, words, result, processed, i + row[k], j + col[k], path);
        }
    }

    // backtrack: mark the current node as unprocessed
    processed[i][j] = false;
}

// Function to search for a given set of words in a boggle
function searchInBoggle(board: string[][], words: string[]): Set<string> | undefined {

    // construct a set to store valid words constructed from the boggle
    const result = new Set<string>();

    // base case
    if (!board || board.length === 0) {
        return;
    }

    // `M × N` board
    const M = board.length;
    const N = board[0].length;

    // construct a boolean matrix to store whether a cell is processed or not
    const processed: boolean[][] = Array.from({ length: M }, () => Array(N).fill(false));

    // generate all possible words in a boggle
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            // consider each character as a starting point and run DFS
            searchBoggle(board, new Set(words), result, processed, i, j);
        }
    }

    return result;
}

const board = [
    ['M', 'S', 'E'],
    ['R', 'A', 'T'],
    ['L', 'O', 'N']
];

const words = ['STAR', 'NOTE', 'SAND', 'STONE'];

const validWords = searchInBoggle(board, words);
console.log(validWords);
```

The time complexity of the proposed solution is exponential. We can improve the time complexity by using a [Trie data structure](https://techiedelight.com/memory-efficient-trie-implementation-using-map-insert-search-delete/). The idea is to build a Trie out of the given words and then perform [preorder traversal](https://techiedelight.com/preorder-tree-traversal-iterative-recursive/) (DFS) on it, as shown below in TypeScript:

```ts
// A class to store a Trie node
class Trie {
    character: Map<string, Trie> = new Map();
    isLeaf = false;    // true when the node is a leaf node
}

// Iterative function to insert a string into a Trie
function insert(root: Trie, s: string): void {
    // start from the root node
    let curr = root;

    for (const ch of s) {
        // go to the next node (create if the path doesn't exist)
        if (!curr.character.has(ch)) {
            curr.character.set(ch, new Trie());
        }
        curr = curr.character.get(ch)!;
    }

    curr.isLeaf = true;
}

// Below arrays detail all eight possible movements from a cell
// (top, right, bottom, left, and four diagonal moves)
const row = [-1, -1, -1, 0, 1, 0, 1, 1];
const col = [-1, 1, 0, -1, -1, 1, 0, 1];

// The function returns false if (x, y) is not valid matrix coordinates
// or cell (x, y) is already processed or doesn't lead to the solution
function isSafe(x: number, y: number, processed: boolean[][], board: string[][], ch: string): boolean {
    return x >= 0 && x < processed.length && y >= 0 && y < processed[0].length &&
        !processed[x][y] && board[x][y] === ch;
}

// A recursive function to search valid words present in a boggle using trie
function searchBoggle(root: Trie, board: string[][], i: number, j: number,
                      processed: boolean[][], path: string, result: Set<string>): void {
    // if a leaf node is encountered
    if (root.isLeaf) {
        // update result with the current word
        result.add(path);
    }

    // mark the current cell as processed
    processed[i][j] = true;

    // traverse all children of the current Trie node
    for (const [key, value] of root.character) {

        // check for all eight possible movements from the current cell
        for (let k = 0; k < row.length; k++) {

            // skip if a cell is invalid, or it is already processed
            // or doesn't lead to any path in the Trie
            if (isSafe(i + row[k], j + col[k], processed, board, key)) {
                searchBoggle(value, board, i + row[k], j + col[k],
                             processed, path + key, result);
            }
        }
    }

    // backtrack: mark the current cell as unprocessed
    processed[i][j] = false;
}

// Function to search for a given set of words in a boggle
function searchInBoggle(board: string[][], words: string[]): Set<string> | undefined {
    // construct a set for storing the result
    const result = new Set<string>();

    // base case
    if (!board || board.length === 0) {
        return;
    }

    // insert all words into a trie
    const root = new Trie();
    for (const word of words) {
        insert(root, word);
    }

    // `M × N` board
    const M = board.length;
    const N = board[0].length;

    // construct a matrix to store whether a cell is processed or not
    const processed: boolean[][] = Array.from({ length: M }, () => Array(N).fill(false));

    // consider each character in the matrix
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            const ch = board[i][j];    // current character

            // proceed only if the current character is a child of the Trie root node
            if (root.character.has(ch)) {
                searchBoggle(root.character.get(ch)!, board, i, j, processed, ch, result);
            }
        }
    }

    // return the result set
    return result;
}

const board = [
    ['M', 'S', 'E', 'F'],
    ['R', 'A', 'T', 'D'],
    ['L', 'O', 'N', 'E'],
    ['K', 'A', 'F', 'B']
];

const words = ['START', 'NOTE', 'SAND', 'STONED'];

const validWords = searchInBoggle(board, words);
console.log(validWords);
```
