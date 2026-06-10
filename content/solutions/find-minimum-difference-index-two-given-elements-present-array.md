# Find the minimum difference between the index of two given elements present in an array

> Source: https://www.techiedelight.com/find-minimum-difference-index-two-given-elements-present-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array `nums` and two integers `x` and `y` present in it, find the minimum absolute difference between indices of `x` and `y` in a single traversal of the array.

For example,

**Input:** arr = { 1, 3, 5, 4, 8, 2, 4, 3, 6, 5 } x = 3, y = 2 **Output:** 2 **Explanation:** Element 3 is present at index 1 and 7, and element 2 is present at index 5. Their minimum absolute difference is min(abs(1-5), abs(7-5)) = 2 **Input:** arr = { 1, 3, 5, 4, 8, 2, 4, 3, 6, 5 } x = 2, y = 5 **Output:** 3 **Explanation:** Element 2 is present at index 5, and element 5 is present at index 2 and 9. Their minimum absolute difference is min(abs(5-2), abs(5-9)) = 3

> 

The idea is to traverse the array and keep track of the last occurrence of `x` and `y`.

  1. If the current element is `x`, find the absolute difference between the current index of `x` and the index of the last occurrence of `y` and update the result if required.
  2. If the current element is `y`, find the absolute difference between the current index of `y` and the index of the last occurrence of `x` and update the result if required.

The algorithm can be implemented as follows in TypeScript:

**Output:** The minimum difference is 3

```ts
// Function to find the minimum difference between the index of two
// elements `x` and `y` present in an array
function findMinDifference(A: number[], x: number, y: number): number {

    const n = A.length;

    // base case
    if (n <= 1) {
        return 0;
    }

    let x_index = n, y_index = n;
    let min_diff = Infinity;

    // traverse the given array
    for (let i = 0; i < n; i++) {

        // if the current element is `x`
        if (A[i] === x) {
            // set `x_index` to the current index
            x_index = i;

            // if `y` is seen before, update the result if required
            if (y_index !== n) {
                min_diff = Math.min(min_diff, Math.abs(x_index - y_index));
            }
        }

        // if the current element is `y`
        if (A[i] === y) {
            // set `y_index` to the current index
            y_index = i;

            // if `x` is seen before, update the result if required
            if (x_index !== n) {
                min_diff = Math.min(min_diff, Math.abs(x_index - y_index));
            }
        }
    }

    return min_diff;
}

const A = [1, 3, 5, 4, 8, 2, 4, 3, 6, 5];
const x = 2;
const y = 5;

const diff = findMinDifference(A, x, y);

if (diff !== Infinity) {
    console.log(`The minimum difference is ${diff}`);
} else {
    console.log("Invalid input");
}
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

Also See:

> [Find a pair with a minimum absolute sum in an array](https://www.techiedelight.com/find-pair-array-minimum-absolute-sum/ "Find a pair with a minimum absolute sum in an array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.93/5. Vote count: 148

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
