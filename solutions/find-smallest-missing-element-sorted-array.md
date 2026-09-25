# Find the smallest missing element from a sorted array

> Source: https://www.techiedelight.com/find-smallest-missing-element-sorted-array/

Given a sorted array of non-negative distinct integers, find the smallest missing non-negative element in it.

For example,

**Input:** nums[] = [0, 1, 2, 6, 9, 11, 15] **Output:** The smallest missing element is 3 **Input:** nums[] = [1, 2, 3, 4, 6, 9, 11, 15] **Output:** The smallest missing element is 0 **Input:** nums[] = [0, 1, 2, 3, 4, 5, 6] **Output:** The smallest missing element is 7

> 

A simple analysis of the problem shows us that the smallest missing number would be the element’s index, which is not equal to its element. For instance, consider array `[0, 1, 2, 6, 9, 11, 15]`. Here, the smallest missing element is 3 since 6 is present at index 3 (instead of element 3). If all elements in the array are at their right position, then the smallest missing number is equal to the array size; For instance, 6 in the case of `[0, 1, 2, 3, 4, 5]`.

A naive solution would be to run a **linear search** on the array and return the first index, which doesn’t match its value. If no mismatch happens, then return the array size. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input. This solution also does not take advantage of the fact that the input is sorted.

We can easily solve this problem in O(log(n)) time by modifying the [binary search algorithm](https://techiedelight.com/binary-search/). The idea is to compare the mid-index with the middle element. If both are the same, then the mismatch is in the right subarray; otherwise, it lies in the left subarray. So, we discard one half accordingly and recur for the other. Following is the TypeScript implementation based on the idea:

```ts
// Function to find the smallest missing element in a sorted
// array of distinct non-negative integers
function findSmallestMissing(nums: number[], left = 0, right = nums.length - 1): number {

    // base condition
    if (left > right) {
        return left;
    }

    const mid = left + Math.floor((right - left) / 2);

    // if the mid-index matches with its value, then the mismatch
    // lies on the right half
    if (nums[mid] === mid) {
        return findSmallestMissing(nums, mid + 1, right);
    }

    // mismatch lies on the left half
    else {
        return findSmallestMissing(nums, left, mid - 1);
    }
}

const nums = [0, 1, 2, 3, 4, 5, 6];

console.log('The smallest missing element is', findSmallestMissing(nums));
```

**Output:** The smallest missing element is 7

The time complexity of the above solution is O(log(n)) and requires O(log(n)) implicit space for the call stack.

Also See:

> [Search an element in a circularly sorted array](https://www.techiedelight.com/search-element-circular-sorted-array/ "Search an element in a circularly sorted array")

> [Find the missing term in a sequence in logarithmic time](https://www.techiedelight.com/find-missing-term-sequence-ologn-time/ "Find the missing term in a sequence in logarithmic time")

> [Find the smallest missing positive number from an unsorted array](https://www.techiedelight.com/find-smallest-missing-positive-number-unsorted-array/ "Find the smallest missing positive number from an unsorted array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.73/5. Vote count: 186

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
