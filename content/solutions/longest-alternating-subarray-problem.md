# Longest Alternating Subarray Problem

> Source: https://www.techiedelight.com/longest-alternating-subarray-problem/

Given an array containing positive and negative elements, find a subarray with alternating positive and negative elements, and in which the subarray is as long as possible.

The Longest Alternating Subarray problem differs from the problem of finding the [Longest Alternating subsequence](https://techiedelight.com/longest-alternating-subsequence/). Unlike a subsequence, a subarray is required to occupy consecutive positions within the original array.

For example, consider array `{ 1, -2, 6, 4, -3, 2, -4, -3 }`. The longest alternating subarray is `{ 4, -3, 2, -4 }`. Note that the longest alternating subarray might not be unique.

> 

We can easily solve this problem in linear time using similar logic as [Kadane’s algorithm](https://techiedelight.com/maximum-subarray-problem-kadanes-algorithm/). The idea is to maintain the longest alternating subarray “ending” at each given array index. This subarray can be a single element (if the previous element has the same sign) or consists of one more element than the longest alternating subarray ending at the previous index (if the previous element has an opposite sign).

Following is a TypeScript implementation of the idea:

```ts
// Function to find the length of the longest subarray with alternating
// positive and negative elements
function findLongestSubarray(nums: number[]): void {
  // base case
  if (!nums || nums.length === 0) {
    return;
  }

  // stores length of longest alternating subarray found so far
  let maxLen = 1;

  // stores ending index of longest alternating subarray found so far
  let endIndex = 0;

  // stores length of longest alternating subarray ending at the current position
  let currLen = 1;

  // traverse the given array starting from the second index
  for (let i = 1; i < nums.length; i++) {
    // if the current element has an opposite sign than the previous element
    if (nums[i] * nums[i - 1] < 0) {
      // include the current element in the longest alternating subarray
      // ending at the previous index
      currLen++;

      // update result if the current subarray length is found to be greater
      if (currLen > maxLen) {
        maxLen = currLen;
        endIndex = i;
      }
    }
    // reset length if the current element has the same sign as the previous
    // element
    else {
      currLen = 1;
    }
  }

  const subarray = nums.slice(endIndex - maxLen + 1, endIndex + 1);
  console.log('The longest alternating subarray is', subarray);
}

const nums = [1, -2, 6, 4, -3, 2, -4, -3];
findLongestSubarray(nums);
```

**Output:** The longest alternating subarray is [4, -3, 2, -4]

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

Because of the way the algorithm uses [optimal substructures](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) (the maximum subarray ending at each position is calculated simply from a related but smaller and overlapping subproblem: the maximum subarray ending at the previous position), this algorithm can be viewed as a simple example of [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/).

Also See:

> [Longest Alternating Subsequence Problem – II](https://www.techiedelight.com/longest-alternating-subsequence-problem/ "Longest Alternating Subsequence Problem – II")

> [Longest Bitonic Subsequence](https://www.techiedelight.com/longest-bitonic-subsequence/ "Longest Bitonic Subsequence")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 212

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
