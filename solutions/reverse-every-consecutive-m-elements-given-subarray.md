# Reverse every consecutive `m`-elements of a subarray

> Source: https://www.techiedelight.com/reverse-every-consecutive-m-elements-given-subarray/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array, reverse every group of consecutive `m` elements in a given subarray of it.

For example,

Consider the below array. A[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }, m = 3 Then for subarray `[i, j]`, where `i` and `j` is **Input:** i = 1, j = 7 or 8 **Output:** [1, 4, 3, 2, 7, 6, 5, 8, 9, 10] **Input:** i = 1, j = 9 **Output:** [1, 4, 3, 2, 7, 6, 5, 10, 9, 8] **Input:** i = 3, j = 5 **Output:** [1, 2, 3, 6, 5, 4, 7, 8, 9, 10] **Input:** i = 3, j = 4 **Output:** [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

> 

The solution can be implemented as follows in TypeScript:

```ts
// Utility function to reverse subarray `A[i, j]`
function reverse(A: number[], i: number, j: number): void {
    if (i >= j) {
        return;
    }

    // otherwise, swap two elements
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;

    // recur for the next pair
    reverse(A, i + 1, j - 1);
}

// Function to reverse every consecutive `m` elements of
// subarray `A[beg, end]`
function rev(A: number[], beg: number, end: number, m: number): void {
    // base case
    if (m <= 1) {
        return;
    }

    // return if the subarray length is less than `m`
    if (m > end - beg + 1) {
        return;
    }

    // reverse every consecutive `m` elements
    for (let i = beg; i <= end; i = i + m) {
        // check if subarray length is at least `m`
        if (i + m - 1 <= end) {
            reverse(A, i, i + m - 1);
        }
    }
}

const A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const m = 3;
const beg = 1, end = 8;

// reverse the array
rev(A, beg, Math.min(end, A.length - 1), m);

// print the modified array
console.log(A);
```

**Output:** 1 4 3 2 7 6 5 8 9 10



The time complexity of the above solution is O(n), where `n` is the size of the input. Since we pass the subarray’s endpoints (we want to reverse) to the second reverse function, and the subarray size would be exactly `m`, its complexity would be O(m). Inside the main reverse function, there will be exactly `n/m` calls made to the second reverse function so that the overall time complexity will be `m×(n/m) = O(n)`. The auxiliary space required by the program is O(n) for recursion (call stack).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.63/5. Vote count: 116

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
