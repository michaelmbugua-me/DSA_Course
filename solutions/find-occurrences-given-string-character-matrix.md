# Find all occurrences of the given string in a character matrix

> Source: https://www.techiedelight.com/find-occurrences-given-string-character-matrix/

Given an `M × N` matrix of characters, find all occurrences of a given string in the matrix. We are allowed to search the string in all eight possible directions, i.e., North, West, South, East, North-East, North-West, South-East, South-West. Note that there should not be any cycles in the output path.

For example, consider the following matrix of characters,

[ D E M X B ] [ A O E P E ] [ D D C O D ] [ E B E D S ] [ C P Y E N ]

If the given string is `CODE`, following are all its occurrences in the matrix:

C(2, 2) O(1, 1) D(0, 0) E(0, 1) C(2, 2) O(1, 1) D(2, 0) E(3, 0) C(2, 2) O(1, 1) D(2, 1) E(1, 2) C(2, 2) O(1, 1) D(2, 1) E(3, 0) C(2, 2) O(1, 1) D(2, 1) E(3, 2) C(2, 2) O(2, 3) D(2, 4) E(1, 4) C(2, 2) O(2, 3) D(3, 3) E(3, 2) C(2, 2) O(2, 3) D(3, 3) E(4, 3)

> 

We can use [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) to solve this problem. The idea is to start from each cell in the matrix and explore all eight paths possible and recursively check if they will lead to the solution or not. To make sure that the path is simple and doesn’t contain any cycles, keep track of cells involved in the current path in a matrix, and before exploring any cell, ignore the cell if it is already covered in the current path.

We can find all the possible locations we can move to from the given location by using the array that stores the relative position of movement from any location. For example, if the current location is `(x, y)`, we can move to `(x + row[k], y + col[k])` for `0 <= k <= 7` using the following array:

int row[] = { -1, -1, -1, 0, 0, 1, 1, 1 } int col[] = { -1, 0, 1, -1, 1, -1, 0, 1 } So, from position `(x, y)`, we can move to: (x – 1, y – 1) (x – 1, y) (x – 1, y + 1) (x, y – 1) (x, y + 1) (x + 1, y – 1) (x + 1, y) (x + 1, y + 1)

The algorithm can be implemented as follows in TypeScript:

```ts
// Below lists detail all eight possible movements from a cell
const row = [-1, -1, -1, 0, 0, 1, 1, 1];
const col = [-1, 0, 1, -1, 1, -1, 0, 1];

// Function to check if it is possible to go to position next
// from the current position. The function returns false if next is
// not in a valid position, or it is already visited
const isValid = (mat: string[][], x: number, y: number, path: [number, number][]): boolean =>
    (x >= 0 && x < mat.length) && (y >= 0 && y < mat[0].length) &&
    !path.some(([px, py]) => px === x && py === y);

const DFS = (mat: string[][], word: string, i: number, j: number,
            path: [number, number][] = [], index: number = 0): void => {

    // return if characters don't match
    if (mat[i][j] !== word[index]) {
        return;
    }

    // include the current cell in the path
    path.push([i, j]);

    // if all words are matched, print the result and return
    if (index === word.length - 1) {
        console.log(JSON.stringify(path));
    }
    else {
        // check all eight possible movements from the current cell
        // and recur for each valid movement
        for (let k = 0; k < row.length; k++) {
            // check if it is possible to go to the next position
            // from the current position
            if (isValid(mat, i + row[k], j + col[k], path)) {
                DFS(mat, word, i + row[k], j + col[k], path, index + 1);
            }
        }
    }

    // backtrack: remove the current cell from the path
    path.pop();
};

const findAllOccurences = (mat: string[][], word: string): void => {
    // base case
    if (!mat || !mat.length || !word.length) {
        return;
    }

    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {
            DFS(mat, word, i, j);
        }
    }
};

const mat = [
    ['D', 'E', 'M', 'X', 'B'],
    ['A', 'O', 'E', 'P', 'E'],
    ['D', 'D', 'C', 'O', 'D'],
    ['E', 'B', 'E', 'D', 'S'],
    ['C', 'P', 'Y', 'E', 'N']
];
const word = 'CODE';

findAllOccurences(mat, word);
```

**Output:** ` [(2, 2), (1, 1), (0, 0), (0, 1)] [(2, 2), (1, 1), (2, 0), (3, 0)] [(2, 2), (1, 1), (2, 1), (1, 2)] [(2, 2), (1, 1), (2, 1), (3, 0)] [(2, 2), (1, 1), (2, 1), (3, 2)] [(2, 2), (2, 3), (2, 4), (1, 4)] [(2, 2), (2, 3), (3, 3), (3, 2)] [(2, 2), (2, 3), (3, 3), (4, 3)] `

**Output:** ` [(2, 2), (1, 1), (0, 0), (0, 1)] [(2, 2), (1, 1), (2, 0), (3, 0)] [(2, 2), (1, 1), (2, 1), (1, 2)] [(2, 2), (1, 1), (2, 1), (3, 0)] [(2, 2), (1, 1), (2, 1), (3, 2)] [(2, 2), (2, 3), (2, 4), (1, 4)] [(2, 2), (2, 3), (3, 3), (3, 2)] [(2, 2), (2, 3), (3, 3), (4, 3)] `

The time complexity of the proposed solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Find the length of the longest path in a matrix with consecutive characters](https://www.techiedelight.com/find-length-longest-path-matrix-consecutive-characters/ "Find the length of the longest path in a matrix with consecutive characters")

> [Generate a list of possible words from a character matrix](https://www.techiedelight.com/generate-list-of-possible-words-from-a-character-matrix/ "Generate a list of possible words from a character matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 169

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
