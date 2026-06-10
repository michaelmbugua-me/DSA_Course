# Find the index of a row containing the maximum number of 1’s in a binary matrix

> Source: https://www.techiedelight.com/find-index-row-containing-maximum-number-1s-matrix/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given a binary `M × N` row-wise sorted matrix, find a row that contains the maximum number of `1's` in linear time.

For example,

**Input:** [ 0 0 0 1 1 ] [ 0 0 1 1 1 ] [ 0 0 0 0 0 ] [ 0 1 1 1 1 ] [ 0 0 0 0 1 ] **Output:** The maximum 1’s are present in row 4

> 

The idea is to start from the top-right corner of the matrix and do the following:

  * If the current cell has value 1, continue moving left till we encounter 0, or all columns are processed;
  * If the current cell has value 0, continue moving down till we encounter 1, or all rows are processed.

Finally, return the row index of the last cell in which we have seen 1. The algorithm can be implemented as follows in TypeScript:

```ts
function findRowIndex(mat: number[][]): number {

    // base case
    if (!mat || !mat.length) {
        return 0;
    }

    // stores row number with maximum index
    let row = -1;

    // `(i, j)` stores the current row and column index

    // start from the top-rightmost cell of the matrix
    let i = 0, j = mat[0].length - 1;

    while (i <= mat.length - 1 && j >= 0) {
        // move left if the current cell has value 1
        if (mat[i][j] === 1) {
            j--;
            row = i;        // update row number
        }
        // otherwise, move down
        else {
            i++;
        }
    }

    return row + 1;
}

const mat = [
    [0, 0, 0, 1, 1],
    [0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1]
];

const rowIndex = findRowIndex(mat);

// rowIndex = 0 means no 1's are present in the matrix
if (rowIndex) {
    console.log(`The maximum 1's are present in the row ${rowIndex}`);
}
```

**Output:** The maximum 1’s are present in the row 4

The time complexity of the proposed solution is O(M + N) for an `M × N` matrix and doesn’t require any extra space.

Also See:

> [Report all occurrences of an element in a row-wise and column-wise sorted matrix in linear time](https://www.techiedelight.com/report-all-occurrences-of-an-element-in-sorted-matrix/ "Report all occurrences of an element in a row-wise and column-wise sorted matrix in linear time")

> [Collect maximum value of coins in a matrix](https://www.techiedelight.com/collect-maximum-value-coins-matrix/ "Collect maximum value of coins in a matrix")

> [Count negative elements present in the sorted matrix in linear time](https://www.techiedelight.com/count-negative-elements-present-sorted-matrix/ "Count negative elements present in the sorted matrix in linear time")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 159

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
