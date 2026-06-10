# Print all subarrays of an array having distinct elements

> Source: https://www.techiedelight.com/print-sub-arrays-array-distinct-elements/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, print all maximum size subarrays having all distinct elements in them.

For example,

**Input:** A[] = { 5, 2, 3, 5, 4, 3 } **Output:** The largest subarrays with all distinct elements are: { 5, 2, 3 } { 2, 3, 5, 4 } { 5, 4, 3 }

> 

The problem differs from the problem of finding the maximum size subsequence with distinct elements. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

We can use a [sliding window](https://techiedelight.com/sliding-window-problems/) to solve this problem easily. The idea is to maintain a window with an invariant that all elements inside it must be distinct. The solution keeps on expanding the window to the right, and if any duplicate is encountered, it shrinks the window from the left until all elements are distinct again. To keep track of distinct elements inside a window, use a map.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to print all sublists having distinct elements
function calculate(A: number[]): void {

    // create a map to mark elements as visited in the current window
    const visited = new Map<number, boolean>();

    // put all elements in a dictionary
    for (const val of A) {
        visited.set(val, false);
    }

    // points to the left and right boundary of the current window,
    // i.e., the current window is formed by `A[left, right]`
    let right = 0;
    let left = 0;

    // loop until the right index of the current window is less
    // than the maximum index
    while (right < A.length) {

        // keep increasing the window size if all elements in the
        // current window are distinct
        while (right < A.length && !visited.get(A[right])) {
            visited.set(A[right], true);
            right = right + 1;
        }

        console.log(A.slice(left, right));

        // As soon as a duplicate is found (`A[right]`), terminate the above loop,
        // and reduce the window's size from its left to remove the duplicate
        while (right < A.length && visited.get(A[right])) {
            visited.set(A[left], false);
            left = left + 1;
        }
    }
}

const A = [5, 2, 3, 5, 4, 3];
calculate(A);
```

**Output:** 5, 2, 3 2, 3, 5, 4 5, 4, 3

The time complexity of the above solution is O(n), where `n` is the input size and requires O(n) extra space to mark elements in the current window.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 136

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/), [Sliding Window](https://www.techiedelight.com/Tags/Sliding-Window/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
