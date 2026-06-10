# Find the smallest window in an array sorting which will make the entire array sorted

> Source: https://www.techiedelight.com/smallest-window-sorting-which-make-array-sorted/

Given an integer array, find the smallest window sorting which will make the entire array sorted in increasing order.

For example,

**Input:** { 1, 2, 3, 7, 5, 6, 4, 8 } **Output:** Sort the array from index 3 to 6 **Input:** { 1, 3, 2, 7, 5, 6, 4, 8 } **Output:** Sort the array from index 1 to 6

> 

We can easily solve this problem in linear time. Following is the complete algorithm:

  1. Traverse array from left to right keeping track of maximum so far and note the last encountered index `j` which is less than the maximum so far.
  2. Traverse array from right to left keeping track of minimum so far and note the last encountered index `i`, which is more than the minimum so far.
  3. Finally, sort the array from index `i` to `j`.

For example, consider array `{ 1, 2, 3, **7** , 5, 6, **4** , 8 }`. If we traverse the array from left to right, the last encountered index, which is less than the maximum so far, is 6. Similarly, if we traverse the array from right to left, the last encountered index, which is more than the minimum so far, is 3. So, we need to sort the array from index 3 to 6.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to find the smallest window in an array, sorting which will
// make the entire array sorted
function findSubarray(A: number[]): void {

    let leftIndex = -1, rightIndex = -1;

    // traverse from left to right and keep track of maximum so far
    let maxSoFar = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < A.length; i++) {
        if (maxSoFar < A[i]) {
            maxSoFar = A[i];
        }

        // find the last position that is less than the maximum so far
        if (A[i] < maxSoFar) {
            rightIndex = i;
        }
    }

    // traverse from right to left and keep track of the minimum so far
    let minSoFar = Number.MAX_SAFE_INTEGER;
    for (let i = A.length - 1; i >= 0; i--) {
        if (minSoFar > A[i]) {
            minSoFar = A[i];
        }

        // find the last position that is more than the minimum so far
        if (A[i] > minSoFar) {
            leftIndex = i;
        }
    }

    if (leftIndex === -1) {
        console.log('Array is already sorted');
        return;
    }

    console.log(`Sort array from index ${leftIndex} to ${rightIndex}`);
}

const A = [1, 3, 2, 7, 5, 6, 4, 8];
findSubarray(A);
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 67

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
