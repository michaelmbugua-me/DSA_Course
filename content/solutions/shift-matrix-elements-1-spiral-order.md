# Shift all matrix elements by 1 in spiral order

> Source: https://www.techiedelight.com/shift-matrix-elements-1-spiral-order/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` integer matrix, shift all its elements by `1` in spiral order.

For example,

**Input:** [ 1 2 3 4 5 ] [ 16 17 18 19 6 ] [ 15 24 25 20 7 ] [ 14 23 22 21 8 ] [ 13 12 11 10 9 ] **Output:** [ 25 1 2 3 4 ] [ 15 16 17 18 5 ] [ 14 23 24 19 6 ] [ 13 22 21 20 7 ] [ 12 11 10 9 8 ]

> 

**Recommended Read:**

> [Print matrix in spiral order](https://techiedelight.com/print-matrix-spiral-order/)

We can easily solve this problem by reading elements from the given matrix one by one in spiral order and replacing them with their previous elements. Four loops are used to maintain the spiral order, each for the top, right, bottom, and left corner of the matrix.

The algorithm can be implemented as follows in TypeScript:

```ts
// Shift all matrix elements by 1 in spiral order
function shiftMatrix(mat: number[][]): void {
    // base case
    if (!mat || mat.length === 0) {
        return;
    }

    let top = 0;
    let bottom = mat.length - 1;
    let left = 0;
    let right = mat[0].length - 1;

    let prev = mat[0][0];

    while (true) {
        if (left > right) {
            break;
        }

        // change top row
        for (let i = left; i <= right; i++) {
            const temp = mat[top][i];
            mat[top][i] = prev;
            prev = temp;
        }

        top++;

        if (top > bottom) {
            break;
        }

        // change right column
        for (let i = top; i <= bottom; i++) {
            const temp = mat[i][right];
            mat[i][right] = prev;
            prev = temp;
        }

        right--;

        if (left > right) {
            break;
        }

        // change bottom row
        for (let i = right; i >= left; i--) {
            const temp = mat[bottom][i];
            mat[bottom][i] = prev;
            prev = temp;
        }

        bottom--;

        if (top > bottom) {
            break;
        }

        // change left column
        for (let i = bottom; i >= top; i--) {
            const temp = mat[i][left];
            mat[i][left] = prev;
            prev = temp;
        }

        left++;
    }

    // first element of the matrix will be the last element replaced
    mat[0][0] = prev;
}

// demo
const matrix = [
    [ 1, 2,    3, 4, 5],
    [16, 17, 18, 19, 6],
    [15, 24, 25, 20, 7],
    [14, 23, 22, 21, 8],
    [13, 12, 11, 10, 9]
];

shiftMatrix(matrix);

for (const row of matrix) {
    console.log(row);
}
```

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix and doesn’t require any extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 148

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
