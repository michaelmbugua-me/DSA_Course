# Check if a subarray with 0 sum exists or not

> Source: https://www.techiedelight.com/check-subarray-with-0-sum-exists-not/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, check if it contains a subarray having zero-sum.

For example,

**Input:** { 3, 4, -7, 3, 1, 3, 1, -4, -2, -2 } **Output:** Subarray with zero-sum exists The subarrays with a sum of 0 are: { 3, 4, -7 } { 4, -7, 3 } { -7, 3, 1, 3 } { 3, 1, -4 } { 3, 1, 3, 1, -4, -2, -2 } { 3, 4, -7, 3, 1, 3, 1, -4, -2, -2 }

Note that the problem deals with [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous, i.e., whose elements occupy consecutive positions in the array.

> 

We can easily solve this problem in linear time by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to use a set to check if a subarray with zero-sum is present in the given array or not. Traverse the array and maintain the sum of elements seen so far. If the sum is seen before (i.e., the sum exists in the set), return true as there exists at least one subarray with zero-sum that ends at the current index; otherwise, insert the sum into the set.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to check if a subarray with zero-sum is present in a given array or not
const hasZeroSumSubarray = (nums: number[]): boolean => {

    // create an empty set to store the sum of elements of each
    // subarray `nums[0…i]`, where `0 <= i < nums.length`
    const s = new Set<number>();

    // insert 0 into the set to handle the case when subarray with
    // zero-sum starts from index 0
    s.add(0);

    let total = 0;

    // traverse the given array
    for (const i of nums) {

        // sum of elements so far
        total += i;

        // if the sum is seen before, we have found a subarray with zero-sum
        if (s.has(total)) {
            return true;
        }

        // insert sum so far into the set
        s.add(total);
    }

    // we reach here when no subarray with zero-sum exists
    return false;
};

// demo

const nums = [4, -6, 3, -1, 4, 2, 7];

if (hasZeroSumSubarray(nums)) {
    console.log('Subarray exists');
} else {
    console.log('Subarray does not exist');
}
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

**Also See:**

> [Print all subarrays with 0 sum](https://techiedelight.com/find-sub-array-with-0-sum/)

**Exercise:** Extend the solution for a non-zero sum of the subarray.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.73/5. Vote count: 338

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
