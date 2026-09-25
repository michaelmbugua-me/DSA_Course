# Find the smallest subarray length whose sum of elements is greater than `k`

> Source: https://www.techiedelight.com/length-of-smallest-subarray-with-sum-greater-number/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array of positive integers, find the smallest subarray’s length whose sum of elements is greater than a given number `k`.

For example,

**Input:** {1, 2, 3, 4, 5, 6, 7, 8}, k = 20 **Output:** The smallest subarray length is 3 **Explanation:** The smallest subarray with sum > 20 is {6, 7, 8} **Input:** {1, 2, 3, 4, 5, 6, 7, 8}, k = 7 **Output:** The smallest subarray length is 1 **Explanation:** The smallest subarray with sum > 7 is {8} **Input:** {1, 2, 3, 4, 5, 6, 7, 8}, k = 21 **Output:** The smallest subarray length is 4 **Explanation:** The smallest subarray with sum > 21 is {4, 5, 6, 7} **Input:** {1, 2, 3, 4, 5, 6, 7, 8}, k = 40 **Output:** No subarray exists

> 

Please note that the problem specifically targets [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements. Also note that we don’t have to print the subarray but return its length.

We can solve this problem by using a [sliding window](https://techiedelight.com/sliding-window-problems/). The idea is to maintain a window that ends at the current element, and the sum of its elements is less than or equal to the given sum. If the current window’s sum becomes more than the given sum at any point of time, then the window is unstable and continue removing elements from the window’ left till it becomes stable again. Also update the result if the unstable window’s length is less than the minimum found so far. Following is a TypeScript implementation of the idea:

```ts
// Function to find the length of the smallest subarray whose sum
// of elements is greater than the given number
function findSmallestSubarrayLen(A: number[], k: number): number {
  // stores the current window sum
  let windowSum = 0;

  // stores the result
  let len = Number.MAX_VALUE;

  // stores the window's starting index
  let left = 0;

  // maintain a sliding window `[left…right]`
  for (let right = 0; right < A.length; right++) {
    // include the current element in the window
    windowSum += A[right];

    // the window becomes unstable if its sum becomes more than `k`
    while (windowSum > k && left <= right) {
      // update the result if the current window's length is less than the
      // minimum found so far
      len = Math.min(len, right - left + 1);

      // remove elements from the window's left side till the window
      // becomes stable again
      windowSum -= A[left];
      left++;
    }
  }

  // invalid input
  if (len === Number.MAX_VALUE) {
    return 0;
  }

  // return result
  return len;
}

// an array of positive numbers
const A = [1, 2, 3, 4, 5, 6, 7, 8];
const k = 21;

// find the length of the smallest subarray
const len = findSmallestSubarrayLen(A, k);

if (len !== Number.MAX_VALUE) {
  console.log(`The smallest subarray length is ${len}`);
} else {
  console.log('No subarray exists');
}
```

**Output:** The smallest subarray length is 4

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

Also See:

> [Find minimum sum subarray of size `k`](https://www.techiedelight.com/find-minimum-sum-subarray-given-size-k/ "Find minimum sum subarray of size `k`")

> [Find a subarray having the given sum in an integer array](https://www.techiedelight.com/find-subarray-having-given-sum-given-array/ "Find a subarray having the given sum in an integer array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 289

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Sliding Window](https://www.techiedelight.com/Tags/Sliding-Window/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
