# Find common elements present in all rows of a matrix

> Source: https://www.techiedelight.com/find-common-elements-present-rows-matrix/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` matrix, find the common elements present in all rows of the matrix. The solution should traverse the matrix once and print the common elements in `O(M × N)` time.

For example,

**Input:** { 2, 4, 3, 8, 7 } { 4, 7, 1, 3, 6 } { 3, 5, 2, 1, 3 } { 4, 5, 0, 2, 3 } **Output:** 3

> 

A naive solution would be to check if each element is present in all rows or not. The time complexity of this solution is O(M2 × N2), which is pretty bad.

An efficient solution is to use a map. Start by inserting every element of the first row into an empty map. Then for every element in the remaining rows, if they are present on the map and occur for the first time in the current row, increment their value in the map by 1. Finally, print the element for the last row, if it has already appeared `M-1` times.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the common elements in all the rows of the specified matrix
function findCommon(mat: number[][]): void {

    // base case
    if (!mat || !mat.length) {
        return;
    }

    const d = new Map<number, number>();

    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[0].length; j++) {

            // insert elements of the first row into the map and
            // initialize them with a value of 1
            if (i === 0) {
                d.set(mat[0][j], 1);

                // if matrix contains the single row, print all its elements
                if (mat.length === 1) {
                    process.stdout.write(`${mat[i][j]} `);
                }
            }

            // from the second row onwards, check if the current element exists
            // in the map and first in the current row
            if (i > 0 && d.has(mat[i][j]) && d.get(mat[i][j]) === i) {
                // increment the count of the element by 1
                d.set(mat[i][j], i + 1);

                // if `i` represent the last row, print the element
                if (i === mat.length - 1) {
                    process.stdout.write(`${mat[i][j]} `);
                }
            }
        }
    }
}

const mat = [
    [2, 4, 3, 8, 7],
    [4, 7, 1, 3, 6],
    [3, 5, 2, 1, 3],
    [4, 5, 0, 2, 3]
];

findCommon(mat);
```

**Author:** Aditya Goel

Also See:

> [Find all common elements present in each row of a matrix](https://www.techiedelight.com/find-common-elements-present-every-row-given-matrix/ "Find all common elements present in each row of a matrix")

> [Change all elements of row `i` and column `j` in a matrix to 0 if cell `(i, j)` is 0](https://www.techiedelight.com/change-elements-row-column-j-matrix-0-cell-j-value-0/ "Change all elements of row `i` and column `j` in a matrix to 0 if cell `\(i, j\)` is 0")

> [Count negative elements present in the sorted matrix in linear time](https://www.techiedelight.com/count-negative-elements-present-sorted-matrix/ "Count negative elements present in the sorted matrix in linear time")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 159

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
