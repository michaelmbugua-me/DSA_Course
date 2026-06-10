# Count negative elements present in the sorted matrix in linear time

> Source: https://www.techiedelight.com/count-negative-elements-present-sorted-matrix/

[Matrix](https://www.techiedelight.com/Category/Matrix/)

Given an `M × N` matrix, which is row-wise and column-wise sorted, count the total number of negative elements present in it in linear time.

For example,

**Input:** [ -7 -3 -1 3 5 ] [ -3 -2 2 4 6 ] [ -1 1 3 5 8 ] [ 3 4 7 8 9 ] **Output:** The total number of negative elements present is 6.

> 

We can do a [binary search](https://techiedelight.com/binary-search/) to find the last occurrence of a negative number or the first occurrence of a positive number for each row. The complexity of this solution will be O(M × log(N)), which is not linear as per problem time constraints.

The idea is to take advantage of the fact that the matrix is row-wise and column-wise sorted. Start from the matrix’s top-rightmost cell and do the following until the matrix boundary is reached:

  * If the current element is negative, increment the negative count and move to the next row.
  * If the current element is positive, move to the left cell.

The algorithm can be implemented as follows in TypeScript:

```ts
function count(mat: number[][]): number {
    // base case
    if (!mat || !mat.length) {
        return 0;
    }

    // `M × N` matrix
    const [M, N] = [mat.length, mat[0].length];

    // variable to store negative number count
    let negative = 0;

    // start from `(0, N-1)` cell, i.e., top-rightmost cell of the matrix
    let [i, j] = [0, N - 1];

    // run till matrix boundary is reached
    while (i <= M - 1 && j >= 0) {
        // if the current element is negative
        if (mat[i][j] < 0) {
            negative += j + 1;  // increment the negative count
            i = i + 1;          // move to the next row
        } else {
            j = j - 1;          // move to the cell to the left
        }
    }

    // return negative number count
    return negative;
}

const mat = [
    [-7, -3, -1, 3, 5],
    [-3, -2, 2, 4, 6],
    [-1, 1, 3, 5, 8],
    [3, 4, 7, 8, 9]
];

console.log("The total number of negative elements present is", count(mat));
```

**Output:** The total number of negative elements present is 6

The time complexity of the proposed solution is O(M + N) for an `M × N` matrix and doesn’t require any extra space.

**Exercise:** Count zeros in a row-wise and column-wise sorted matrix.

Also See:

> [Report all occurrences of an element in a row-wise and column-wise sorted matrix in linear time](https://www.techiedelight.com/report-all-occurrences-of-an-element-in-sorted-matrix/ "Report all occurrences of an element in a row-wise and column-wise sorted matrix in linear time")

> [Find the index of a row containing the maximum number of 1’s in a binary matrix](https://www.techiedelight.com/find-index-row-containing-maximum-number-1s-matrix/ "Find the index of a row containing the maximum number of 1’s in a binary matrix")

> [Find minimum passes required to convert all negative values in a matrix](https://www.techiedelight.com/find-minimum-passes-required-convert-negative-values-matrix/ "Find minimum passes required to convert all negative values in a matrix")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 171

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
