# Flood Fill Algorithm

> Source: https://www.techiedelight.com/flood-fill-algorithm/

Flood fill (also known as seed fill) is an algorithm that determines the area connected to a given node in a multi-dimensional array.

It is used in the “bucket” fill tool of a paint program to fill connected, similarly colored areas with a different color and in games such as Go and Minesweeper for determining which pieces are cleared. When applied on an image to fill a particular bounded area with color, it is also known as boundary fill.

The flood fill algorithm takes three parameters: a start node, a target color, and a replacement color.

Consider the following matrix to the left – if the start node is `(3, 9)`, target color is **“BLACK”** and replacement color is **“GREY”** , the algorithm looks for all nodes in the matrix that are connected to the start node by a path of the target color and changes them to the replacement color.

_Note that each cell of the matrix represents one pixel._

> 

## Approach 1: (Using BFS)

A [queue](https://techiedelight.com/circular-queue-implementation-c/)-based implementation using [Breadth–first search (BFS)](https://techiedelight.com/breadth-first-search/) is shown below in pseudocode.

**BFS (starting-pixel, replacement-color):**

  1. Create an empty queue.
  2. Enqueue starting pixel and mark it as processed.
  3. Loop till queue is empty

     1. Dequeue the front node and process it.
     2. Replace the color of the current pixel (popped node) with that of the replacement.
     3. Process all eight adjacent pixels of the current pixel and enqueue each valid pixel that has the same color as that of the current pixel.

The algorithm can be implemented as follows in TypeScript:

```ts
// Below arrays detail all eight possible movements
const row = [-1, -1, -1, 0, 0, 1, 1, 1];
const col = [-1, 0, 1, -1, 1, -1, 0, 1];

// check if it is possible to go to pixel (x, y) from the
// current pixel. The function returns false if the pixel
// has a different color, or it's not a valid pixel
function isSafe(mat: string[][], x: number, y: number, target: string): boolean {
    return x >= 0 && x < mat.length && y >= 0 && y < mat[0].length && mat[x][y] === target;
}

// Flood fill using BFS
function floodfill(mat: string[][], x: number, y: number, replacement: string): void {
    // base case
    if (!mat || mat.length === 0) {
        return;
    }

    // create a queue and enqueue starting pixel
    const q: [number, number][] = [];
    q.push([x, y]);

    // get the target color
    const target = mat[x][y];

    // target color is same as replacement
    if (target === replacement) {
        return;
    }

    // break when the queue becomes empty
    while (q.length > 0) {
        // dequeue front node and process it
        [x, y] = q.shift()!;

        // replace the current pixel color with that of replacement
        mat[x][y] = replacement;

        // process all eight adjacent pixels of the current pixel and
        // enqueue each valid pixel
        for (let k = 0; k < row.length; k++) {
            // if the adjacent pixel at position (x + row[k], y + col[k]) is
            // is valid and has the same color as the current pixel
            if (isSafe(mat, x + row[k], y + col[k], target)) {
                // enqueue adjacent pixel
                q.push([x + row[k], y + col[k]]);
            }
        }
    }
}

// matrix showing portion of the screen having different colors
const mat: string[][] = [
    'YYYGGGGGGG'.split(''),
    'YYYYYYGXXX'.split(''),
    'GGGGGGGXXX'.split(''),
    'WWWWWGGGGX'.split(''),
    'WRRRRRGXXX'.split(''),
    'WWWRRGGXXX'.split(''),
    'WBWRRRRRRX'.split(''),
    'WBBBBRRXXX'.split(''),
    'WBBXBBBBXX'.split(''),
    'WBBXXXXXXX'.split('')
];

// start node
const x = 3;
const y = 9;    // having target color `X`

// replacement color
const replacement = 'C';

// replace the target color with a replacement color
floodfill(mat, x, y, replacement);

// print the colors after replacement
for (const r of mat) {
    console.log(r.join(' '));
}
```

**Output:** Y Y Y G G G G G G G Y Y Y Y Y Y G C C C G G G G G G G C C C W W W W W G G G G C W R R R R R G C C C W W W R R G G C C C W B W R R R R R R C W B B B B R R C C C W B B C B B B B C C W B B C C C C C C C

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space, where `M` and `N` are dimensions of the matrix.

## Approach 2: (Using DFS)

We can use [Depth–first search (DFS)](https://techiedelight.com/depth-first-search/) to solve this problem. The idea is to start from the source node in the matrix, replace its color with the replacement color and recursively explore all its valid eight adjacent pixels, and replace their color. Note that we don’t need a visited array here as we are replacing the color of every processed node, and it won’t be considered again next time as it will have a different color.

The algorithm can be implemented as follows in TypeScript:

```ts
// Below arrays detail all eight possible movements
const row = [-1, -1, -1, 0, 0, 1, 1, 1];
const col = [-1, 0, 1, -1, 1, -1, 0, 1];

// check if it is possible to go to pixel (x, y) from the
// current pixel. The function returns false if the pixel
// has a different color, or it's not a valid pixel
function isSafe(mat: string[][], x: number, y: number, target: string): boolean {
    return x >= 0 && x < mat.length && y >= 0 && y < mat[0].length && mat[x][y] === target;
}

// Flood fill using DFS
function floodfill(mat: string[][], x: number, y: number, replacement: string): void {
    // base case
    if (!mat || mat.length === 0) {
        return;
    }

    // get the target color
    const target = mat[x][y];

    // target color is same as replacement
    if (target === replacement) {
        return;
    }

    // replace the current pixel color with that of replacement
    mat[x][y] = replacement;

    // process all eight adjacent pixels of the current pixel and
    // recur for each valid pixel
    for (let k = 0; k < row.length; k++) {
        // if the adjacent pixel at position (x + row[k], y + col[k]) is
        // a valid pixel and has the same color as that of the current pixel
        if (isSafe(mat, x + row[k], y + col[k], target)) {
            floodfill(mat, x + row[k], y + col[k], replacement);
        }
    }
}

// matrix showing portion of the screen having different colors
const mat: string[][] = [
    'YYYGGGGGGG'.split(''),
    'YYYYYYGXXX'.split(''),
    'GGGGGGGXXX'.split(''),
    'WWWWWGGGGX'.split(''),
    'WRRRRRGXXX'.split(''),
    'WWWRRGGXXX'.split(''),
    'WBWRRRRRRX'.split(''),
    'WBBBBRRXXX'.split(''),
    'WBBXBBBBXX'.split(''),
    'WBBXXXXXXX'.split('')
];

// start node
const x = 3;
const y = 9;    // having a target color `X`

// replacement color
const replacement = 'C';

// replace the target color with a replacement color using DFS
floodfill(mat, x, y, replacement);

// print the colors after replacement
for (const r of mat) {
    console.log(r.join(' '));
}
```

The time complexity of the proposed solution is O(M × N) and requires O(M × N) extra space, where `M` and `N` are dimensions of the matrix.

**References:** [Flood Fill – Wikipedia](https://en.wikipedia.org/wiki/Flood_fill)
