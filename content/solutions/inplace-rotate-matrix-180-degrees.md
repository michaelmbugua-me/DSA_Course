# In-place rotate matrix by 180 degrees

> Source: https://www.techiedelight.com/inplace-rotate-matrix-180-degrees/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given a square matrix, rotate the matrix by 180 degrees in a clockwise direction. The transformation should be done [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) in quadratic time.

For example,

**Input:** 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 **Output:** 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1

> 

If we swap elements of the first row with the last row elements in reverse order, elements of the second row with the elements of the second last row in reverse order, and so on… we will get our desired matrix. Note that if the matrix has odd dimensions, reverse elements of the middle row.

The algorithm can be implemented as follows in TypeScript:

```ts
// In-place rotate it by 180 degrees in an anti-clockwise direction
function rotateMatrix(mat: number[][]): void {

    // base case
    if (mat === null || mat.length === 0) {
        return;
    }

    // `N × N` matrix
    const N = mat.length;

    // rotate the matrix by 180 degrees
    for (let i = 0; i < N / 2; i++) {
        for (let j = 0; j < N; j++) {
            const temp = mat[i][j];
            mat[i][j] = mat[N - i - 1][N - j - 1];
            mat[N - i - 1][N - j - 1] = temp;
        }
    }

    // handle the case when the matrix has odd dimensions
    if (N % 2 === 1) {
        for (let j = 0; j < N / 2; j++) {
            const temp = mat[N / 2][j];
            mat[N / 2][j] = mat[N / 2][N - j - 1];
            mat[N / 2][N - j - 1] = temp;
        }
    }
}

const mat = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
];

rotateMatrix(mat);

// print the matrix
for (const r of mat) {
    console.log(r.join(' '));
}
```

**Output:** 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1

The time complexity of the proposed solution is O(N2) for an `N × N` matrix and doesn’t require any extra space.

**Related Posts:**

> [In-place rotate matrix by 90 degrees in a clockwise direction](https://techiedelight.com/place-rotate-matrix-90-degrees-clock-wise-direction/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 114

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
