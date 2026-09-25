# Replace all occurrences of 0 that are not surrounded by 1 in a binary matrix

> Source: https://www.techiedelight.com/replace-occurrences-0-not-surrounded-1-binary-matrix/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` binary matrix, replace all occurrences of 0’s by 1’s, which are not completely surrounded by 1’s from all sides (top, left, bottom, right, top-left, top-right, bottom-left, and bottom-right).

For example, consider the following matrix:

[ 1 1 1 1 0 0 1 1 0 1 ] [ 1 0 0 1 1 0 1 1 1 1 ] [ 1 0 0 1 1 1 1 1 1 1 ] [ 1 1 1 1 0 0 1 1 0 1 ] [ 1 1 1 1 0 0 0 1 0 1 ] [ 1 1 0 1 1 0 1 1 0 0 ] [ 1 1 0 1 1 1 1 1 1 1 ] [ 1 1 0 1 1 0 0 1 0 1 ] [ 1 1 1 0 1 0 1 0 0 1 ] [ 1 1 1 0 1 1 1 1 1 1 ]

The solution should convert it into the following matrix:

[ 1 1 1 1 1 1 1 1 1 1 ] [ 1 0 0 1 1 1 1 1 1 1 ] [ 1 0 0 1 1 1 1 1 1 1 ] [ 1 1 1 1 0 0 1 1 1 1 ] [ 1 1 1 1 0 0 0 1 1 1 ] [ 1 1 1 1 1 0 1 1 1 1 ] [ 1 1 1 1 1 1 1 1 1 1 ] [ 1 1 1 1 1 0 0 1 0 1 ] [ 1 1 1 1 1 0 1 0 0 1 ] [ 1 1 1 1 1 1 1 1 1 1 ]

> 

We can use [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) to solve this problem. The idea is to consider all zeros present on the matrix boundary one by one and start a depth–first search from them to replace all connected `0’s`. Note that we don’t need a visited array here as we are replacing every processed node’s value, and it won’t be considered again next time as it will have value `1`.

The algorithm can be implemented as follows in TypeScript:

```ts
// Below arrays detail all eight possible movements
const row = [-1, -1, -1, 0, 0, 1, 1, 1];
const col = [-1, 0, 1, -1, 1, -1, 0, 1];

// check false if `(x, y)` is not a valid location
function isValid(mat: number[][], x: number, y: number): boolean {
    return x >= 0 && x < mat.length && y >= 0 && y < mat[0].length;
}

function DFS(mat: number[][], x: number, y: number): void {
    // replace 0 by 1
    mat[x][y] = 1;

    // process all eight adjacent locations of the current cell and
    // recur for each valid location
    for (let k = 0; k < 8; k++) {
        const i = x + row[k];
        const j = y + col[k];

        // if the adjacent location at position `(i, j)` is
        // valid and has a value 0
        if (isValid(mat, i, j) && mat[i][j] === 0) {
            DFS(mat, i, j);
        }
    }
}

function replaceZeros(mat: number[][]): void {
    // base case
    if (!mat || mat.length === 0) {
        return;
    }

    // `M × N` matrix
    const M = mat.length;
    const N = mat[0].length;

    // check every element on the first and last column of the matrix
    for (let i = 0; i < M; i++) {
        if (mat[i][0] === 0) {
            DFS(mat, i, 0);
        }

        if (mat[i][N - 1] === 0) {
            DFS(mat, i, N - 1);
        }
    }

    // check every element on the first and last row of the matrix
    for (let j = 0; j < N - 1; j++) {
        if (mat[0][j] === 0) {
            DFS(mat, 0, j);
        }

        if (mat[M - 1][j] === 0) {
            DFS(mat, M - 1, j);
        }
    }
}

const mat = [
    [1, 1, 1, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1]
];

replaceZeros(mat);

for (const r of mat) {
    console.log(r);
}
```

**Output:** 1 1 1 1 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 1 1 1 1 0 0 1 1 1 1 1 1 1 1 0 0 0 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 1 0 1 1 1 1 1 1 0 1 0 0 1 1 1 1 1 1 1 1 1 1 1



The time complexity of the proposed solution is O(M × N) for an `M × N` matrix. The auxiliary space required by the program is O(M × N) for recursion (call stack).

Also See:

> [Replace all occurrences of 0 that are surrounded by 1 in a binary matrix](https://www.techiedelight.com/replace-occurrences-of-0-surrounded-by-1-matrix/ "Replace all occurrences of 0 that are surrounded by 1 in a binary matrix")

> [Find all occurrences of the given string in a character matrix](https://www.techiedelight.com/find-occurrences-given-string-character-matrix/ "Find all occurrences of the given string in a character matrix")

> [Shift all matrix elements by 1 in spiral order](https://www.techiedelight.com/shift-matrix-elements-1-spiral-order/ "Shift all matrix elements by 1 in spiral order")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 137

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
