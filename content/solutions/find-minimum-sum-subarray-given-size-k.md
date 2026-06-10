# Find minimum sum subarray of size `k`

> Source: https://www.techiedelight.com/find-minimum-sum-subarray-given-size-k/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find the minimum sum subarray of size `k`, where `k` is a positive integer.

For example,

**Input:** {10, 4, 2, 5, 6, 3, 8, 1}, k = 3 **Output:** Minimum sum subarray of size 3 is (1, 3)

> 

The problem differs from the problem of finding the minimum sum subsequence of size `k`. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

We can solve this problem by using the [sliding window technique](https://techiedelight.com/sliding-window-problems/). The idea is to maintain a window of size `k`. For every array element, include it in the window and remove the window’s leftmost element if the window size is more than `k`. Also maintain the sum of elements in the current window. If the sum of the current window is less than the minimum found so far, update the minimum sum to the current window sum and store the window’s endpoints.

The algorithm can be implemented as follows in TypeScript:

```ts
// Find the minimum sum subarray of a given size `k`
const findSubarray = (arr: number[], k: number): void => {

    // base case
    if (arr.length === 0 || arr.length <= k) {
        return;
    }

    // stores the sum of elements in the current window
    let window_sum = 0;

    // stores the sum of minimum sum subarray found so far
    let min_window = Number.MAX_SAFE_INTEGER;

    // stores ending index of the minimum sum subarray found so far
    let last = 0;

    for (let i = 0; i < arr.length; i++)
    {
        // add the current element to the window
        window_sum += arr[i];

        // if the window size is more than equal to `k`
        if (i + 1 >= k)
        {
            // update the minimum sum window
            if (min_window > window_sum)
            {
                min_window = window_sum;
                last = i;
            }

            // remove a leftmost element from the window
            window_sum -= arr[i + 1 - k];
        }
    }

    console.log(`The minimum sum subarray is (${last - k + 1}, ${last})`);
};

const arr = [10, 4, 2, 5, 6, 3, 8, 1];
const k = 3;

findSubarray(arr, k);
```

**Output:** The minimum sum subarray is (1, 3)

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

**Exercise:** Find the minimum product subarray of a given size `k`

Also See:

> [Find a subarray having the given sum in an integer array](https://www.techiedelight.com/find-subarray-having-given-sum-given-array/ "Find a subarray having the given sum in an integer array")

> [Find the smallest subarray length whose sum of elements is greater than `k`](https://www.techiedelight.com/length-of-smallest-subarray-with-sum-greater-number/ "Find the smallest subarray length whose sum of elements is greater than `k`")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 166

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Sliding Window](https://www.techiedelight.com/Tags/Sliding-Window/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
