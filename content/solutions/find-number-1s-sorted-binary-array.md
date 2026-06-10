# Find the number of 1’s in a sorted binary array

> Source: https://www.techiedelight.com/find-number-1s-sorted-binary-array/

Given a sorted binary array, efficiently count the total number of 1’s in it.

For example,

**Input:** nums[] = [0, 0, 0, 0, 1, 1, 1] **Output:** The total number of 1’s present is 3 **Input:** nums[] = [0, 0, 1, 1, 1, 1, 1] **Output:** The total number of 1’s present is 5

> 

A simple solution would be to run a linear search on the array and find the first occurrence of 1. The output will then be the array’s length minus the index of the first occurrence of 1. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input.

We can easily solve this problem in O(log(n)) time using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) by taking advantage of the fact that the input is sorted (i.e., all 0’s, followed by all 1’s). The idea is to split the array into two halves and recur for both halves. If the last element of the subarray is 0, then all 0’s are present in it since it is sorted, and we return 0 from the function. If the first array element is 1, then all its elements are 1’s only since the array is sorted, and we return the total number of elements in that partition.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the total number of 1's in a sorted binary array
const count = (nums: number[], left: number = 0, right: number = nums.length - 1): number => {

    // base case
    if (!nums.length) {
        return 0;
    }

    // if the last element in the array is 0, no 1's can
    // be present since it is sorted
    if (nums[right] === 0) {
        return 0;
    }

    // if the first element in the array is 1, all its elements
    // are ones only since it is sorted
    if (nums[left] === 1) {
        return right - left + 1;
    }

    // divide the array into left and right subarray and recur
    const mid = Math.floor((left + right) / 2);
    return count(nums, left, mid) + count(nums, mid + 1, right);
};

const nums = [0, 0, 0, 0, 1, 1, 1];
console.log(`The total number of 1's present is ${count(nums)}`);
```

**Output:** The total number of 1’s present is 3

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 176

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
