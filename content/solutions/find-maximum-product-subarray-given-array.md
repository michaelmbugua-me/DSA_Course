# Maximum Product Subarray Problem

> Source: https://www.techiedelight.com/find-maximum-product-subarray-given-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find the subarray that has the maximum product of its elements. The solution should return the maximum product of elements among all possible subarrays.

For example,

**Input:** { -6, 4, -5, 8, -10, 0, 8 } **Output:** 1600 **Explanation:** The maximum product subarray is {4, -5, 8, -10} having product 1600 **Input:** { 40, 0, -20, -10 } **Output:** 200 **Explanation:** The maximum product subarray is {-20, -10} having product 200

> 

The problem differs from the problem of finding the maximum product subsequence. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

A naive solution would be to consider every subarray and find the product of their elements. Finally, return the maximum product found among all subarrays. The implementation can be seen [here](https://techiedelight.com/compiler/?run=fTvS9Q). The time complexity of this solution is O(n2), where `n` is the size of the input.

A better solution will be to maintain two variables to store the maximum and minimum product ending in the current position. Then traverse the array once, and for every index `i` in the array, update the maximum and minimum product ending at `A[i]`. Update the result if the maximum product ending at any index is more than the maximum product found so far.

Following is a TypeScript implementation based on the above idea:

**Output:** The maximum product of a subarray is 1600

```ts
// Function to return the maximum product of a subarray of a given array
function findMaxProduct(A: number[]): number {

    // base case
    if (!A.length) {
        return 0;
    }

    // maintain two variables to store the maximum and minimum product
    // ending at the current index
    let max_ending = A[0], min_ending = A[0];

    // to store the maximum product subarray found so far
    let max_so_far = A[0];

    // traverse the given array
    for (let i = 1; i < A.length; i++) {
        const temp = max_ending;

        // update the maximum product ending at the current index
        max_ending = Math.max(A[i], Math.max(A[i] * max_ending, A[i] * min_ending));

        // update the minimum product ending at the current index
        min_ending = Math.min(A[i], Math.min(A[i] * temp, A[i] * min_ending));

        max_so_far = Math.max(max_so_far, max_ending);
    }

    // return maximum product
    return max_so_far;
}

const A = [-6, 4, -5, 8, -10, 0, 8];
console.log(`The maximum product of a subarray is ${findMaxProduct(A)}`);
```

The time complexity of the above solution is O(n) and doesn’t require any extra space.

Also See:

> [Maximum Sum Circular Subarray](https://www.techiedelight.com/maximum-sum-circular-subarray/ "Maximum Sum Circular Subarray")

> [Maximum Sum Subarray Problem (Kadane’s Algorithm)](https://www.techiedelight.com/maximum-subarray-problem-kadanes-algorithm/ "Maximum Sum Subarray Problem \(Kadane’s Algorithm\)")

> [Find the maximum absolute difference between the sum of two non-overlapping subarrays](https://www.techiedelight.com/find-maximum-absolute-difference-subarrays/ "Find the maximum absolute difference between the sum of two non-overlapping subarrays")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.62/5. Vote count: 153

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
