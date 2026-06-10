# Create a spiral matrix from a given array

> Source: https://www.techiedelight.com/create-spiral-matrix-given-array/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an integer array containing `M × N` elements, construct an `M × N` matrix from it in spiral order.

For example,

**Input:** 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 **Output:** [ 1 2 3 4 5 ] [ 16 17 18 19 6 ] [ 15 24 25 20 7 ] [ 14 23 22 21 8 ] [ 13 12 11 10 9 ]

> 

This problem is mainly the reverse of the following problem:

> [Print matrix in spiral order](https://techiedelight.com/print-matrix-spiral-order/)

The idea remains the same – read elements from the given array one by one and fill the matrix in spiral order. Four loops are used to maintain the spiral order, each for the top, right, bottom, and left corner of the matrix.

Following is the implementation in TypeScript based on the above idea:

```ts
// Create a spiral matrix from a given array
function printSpiralOrder(A: number[], M: number, N: number): number[][] {
    // base case
    if (!A) {
        return [];
    }

    // construct an `M × N` matrix
    const mat: number[][] = Array.from({ length: M }, () => new Array(N).fill(0));

    let top = 0, left = 0;
    let bottom = M - 1;
    let right = N - 1;

    let index = 0;

    while (true) {
        if (left > right) {
            break;
        }

        // print top row
        for (let i = left; i <= right; i++) {
            mat[top][i] = A[index];
            index = index + 1;
        }
        top = top + 1;

        if (top > bottom) {
            break;
        }

        // print right column
        for (let i = top; i <= bottom; i++) {
            mat[i][right] = A[index];
            index = index + 1;
        }
        right = right - 1;

        if (left > right) {
            break;
        }

        // print bottom row
        for (let i = right; i >= left; i--) {
            mat[bottom][i] = A[index];
            index = index + 1;
        }
        bottom = bottom - 1;

        if (top > bottom) {
            break;
        }

        // print left column
        for (let i = bottom; i >= top; i--) {
            mat[i][left] = A[index];
            index = index + 1;
        }
        left = left + 1;
    }

    for (const r of mat) {
        console.log(r);
    }

    return mat;
}

// `M × N` matrix
const M = 5;
const N = 5;

// an array of size `M×N`
const A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

printSpiralOrder(A, M, N);
```

**Output:** 1 2 3 4 5 16 17 18 19 6 15 24 25 20 7 14 23 22 21 8 13 12 11 10 9

The time complexity of the proposed solution is O(M × N) for an `M × N` matrix and doesn’t require any extra space.

**Exercise:** Write recursive solution of above problem.

Also See:

> [Shift all matrix elements by 1 in spiral order](https://www.techiedelight.com/shift-matrix-elements-1-spiral-order/ "Shift all matrix elements by 1 in spiral order")

> [Print matrix in spiral order](https://www.techiedelight.com/print-matrix-spiral-order/ "Print matrix in spiral order")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 147

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
