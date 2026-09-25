# Find the length of the longest path in a matrix with consecutive characters

> Source: https://www.techiedelight.com/find-length-longest-path-matrix-consecutive-characters/

Given an `M × N` matrix of characters, find the length of the longest path in the matrix starting from a given character. All characters in the longest path should be increasing and consecutive to each other in alphabetical order.

We are allowed to search the string in all eight possible directions, i.e., North, West, South, East, North-East, North-West, South-East, South-West.

For example, consider the following matrix of characters:

[ D, E, H, X, B ] [ A, O, G, P, E ] [ D, D, C, F, D ] [ E, B, E, A, S ] [ C, D, Y, E, N ]

The length of the longest path with consecutive characters starting from character `C` is 6. The longest path is:

C(2, 2) —> D(2, 1) —> E(3, 2) —> F(2, 3) —> G(1, 2) —> H(0, 2)

> 

We can use [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) to solve this problem. The idea is to start from a given starting character in the matrix and explore all eight paths possible and recursively find the length of the longest path.

We can find all the possible locations we can move to from the given location by using the array that stores the relative position of movement from any location. For example, if the current location is `(x, y)`, we can move to `(x + row[k], y + col[k])` for `0 <= k <= 7` using the following array:

row[] = { -1, -1, -1, 0, 0, 1, 1, 1 } col[] = { -1, 0, 1, -1, 1, -1, 0, 1 } So, from position `(x, y)`, we can move to: (x – 1, y – 1) (x – 1, y) (x – 1, y + 1) (x, y – 1) (x, y + 1) (x + 1, y – 1) (x + 1, y) (x + 1, y + 1)

The algorithm can be implemented as follows in TypeScript. Note that we don’t need to keep track of cells involved in the current path in a matrix since the path is formed by consecutive characters that are strictly increasing, and there won’t be any cycles in the output path.

```ts
// Below lists detail all eight possible movements
const row = [-1, -1, -1, 0, 0, 1, 1, 1];
const col = [-1, 0, 1, -1, 1, -1, 0, 1];

// check whether cell (x, y) is valid or not
function isValid(x: number, y: number, mat: string[][]): boolean {
    return 0 <= x && x < mat.length && 0 <= y && y < mat[0].length;
}

// Find the length of the longest path in matrix `mat[][]` with consecutive characters.
// The path should continue from the previous character.
// Here, (i, j) denotes the coordinates of the current cell.
function findMaxLength(mat: string[][], x: number, y: number, previous: string): number {

    // base case: return length 0 if the current cell (x, y) is invalid or
    // the current character is not consecutive to the previous character
    if (!isValid(x, y, mat) || String.fromCharCode(previous.charCodeAt(0) + 1) !== mat[x][y]) {
        return 0;
    }

    // stores length of the longest path
    let max_len = 0;

    // recur for all eight adjacent cells from the current cell
    for (let k = 0; k < row.length; k++) {

        // visit position (x + row[k], y + col[k]) and find the maximum length
        // from that path
        const length = findMaxLength(mat, x + row[k], y + col[k], mat[x][y]);

        // update the length of the longest path if required
        max_len = Math.max(max_len, 1 + length);
    }

    return max_len;
}

// Find the length of the longest path in a matrix with consecutive characters
function findMaximumLength(mat: string[][], ch: string): number {

    // base case
    if (!mat || !mat.length) {
        return 0;
    }

    // `M × N` matrix
    const [M, N] = [mat.length, mat[0].length];

    // stores length of the longest path
    let max_len = 0;

    // traverse the matrix
    for (let x = 0; x < M; x++) {
        for (let y = 0; y < N; y++) {
            // start from the current cell if its value matches with the given character
            if (mat[x][y] === ch) {
                // recur for all eight adjacent cells from the current cell
                for (let k = 0; k < row.length; k++) {
                    // visit position (x + row[k], y + col[k]) and
                    // find the maximum length from that path
                    const length = findMaxLength(mat, x + row[k], y + col[k], ch);

                    // update the length of the longest path if required
                    max_len = Math.max(max_len, 1 + length);
                }
            }
        }
    }

    return max_len;
}

// input matrix
const mat = [
    ['D', 'E', 'H', 'X', 'B'],
    ['A', 'O', 'G', 'P', 'E'],
    ['D', 'D', 'C', 'F', 'D'],
    ['E', 'B', 'E', 'A', 'S'],
    ['C', 'D', 'Y', 'E', 'N']
];

// starting character
const ch = 'C';

console.log('The length of the longest path with consecutive characters starting from ' +
    'character', ch, 'is', findMaximumLength(mat, ch));
```

**Output:** The length of the longest path with consecutive characters starting from character C is 6

The time complexity of the proposed solution is exponential and requires additional space for the recursion (call stack). The problem also exhibits both [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems) properties of [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/). So, we can save the subproblem solutions in memory rather than computing them again and again. The dynamic programming implementation is left as an exercise to the readers.

Also See:

> [Find the path from source to destination in a matrix that satisfies given constraints](https://www.techiedelight.com/find-path-source-destination-matrix-satisfies-given-constraints/ "Find the path from source to destination in a matrix that satisfies given constraints")

> [Find minimum path sum in a triangle-shaped matrix](https://www.techiedelight.com/find-minimum-path-sum-triangle-matrix/ "Find minimum path sum in a triangle-shaped matrix")

> [Find the longest possible route in a matrix](https://www.techiedelight.com/find-longest-possible-route-matrix/ "Find the longest possible route in a matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 177

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Depth-first search](https://www.techiedelight.com/Tags/DFS/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
