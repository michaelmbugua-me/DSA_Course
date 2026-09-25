# Find the largest subarray having an equal number of 0’s and 1’s

> Source: https://www.techiedelight.com/find-maximum-length-sub-array-equal-number-0s-1s/

[Array](https://www.techiedelight.com/Category/Array/)

Given a binary array containing 0’s and 1’s, find the largest subarray with equal numbers of 0’s and 1’s.

For example,

**Input:** { 0, 0, 1, 0, 1, 0, 0 } **Output:** Largest subarray is { 0, 1, 0, 1 } or { 1, 0, 1, 0 }

> 

The problem differs from the problem of finding the largest subsequence with equal numbers of 0’s and 1’s. Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

A naive solution would be to consider all subarrays and, for each subarray, count the total number of 0’s and 1’s present. If the subarray contains an equal number of 0’s and 1’s, update the largest subarray if required. The time complexity of the naive solution is O(n3) as there are `n2` subarrays in an array of size `n`, and it takes O(n) time to find count 0’s and 1’s. We can optimize the method to run in O(n2) time by calculating the count of 0’s and 1’s in constant time.

We can use the map to solve this problem in linear time. The idea is to replace 0 with -1 and find out the largest subarray with a sum of 0. To find the largest subarray with a sum of 0, create an empty map that stores the first subarray’s ending index having a given sum. Then traverse the given array and maintain the sum of elements seen so far.

  * If the sum is seen for the first time, insert the sum with its index into the map.
  * If the sum is seen before, there exists a subarray with a sum of 0, which ends at the current index, and update the largest subarray if the current subarray has more length.

The algorithm can be implemented as follows in TypeScript:

**Output:** [1, 4]

```ts
// Function to find the largest subarray having an equal number of 0's and 1's
function findLargestSubarray(nums: number[]): void {

    // create an empty map to store the ending index of the first subarray
    // having some sum
    const map = new Map<number, number>();

    // insert (0, -1) pair into the set to handle the case when a
    // subarray with zero-sum starts from index 0
    map.set(0, -1);

    // `len` stores the maximum length of subarray with zero-sum
    let len = 0;

    // stores ending index of the largest subarray having zero-sum
    let ending_index = -1;

    let sum = 0;

    // Traverse through the given array
    for (let i = 0; i < nums.length; i++) {

        // sum of elements so far (replace 0 with -1)
        sum += (nums[i] === 0) ? -1 : 1;

        // if the sum is seen before
        if (map.has(sum)) {

            // update length and ending index of largest subarray having zero-sum
            if (len < i - map.get(sum)) {
                len = i - map.get(sum);
                ending_index = i;
            }
        }
        // if the sum is seen for the first time, insert the sum with its
        // index into the map
        else {
            map.set(sum, i);
        }
    }

    // print the subarray if present
    if (ending_index !== -1) {
        console.log(`[${ending_index - len + 1}, ${ending_index}]`);
    } else {
        console.log("No subarray exists");
    }
}

const nums = [0, 0, 1, 0, 1, 0, 0];
findLargestSubarray(nums);
```

The time complexity of the above solution O(n) and requires O(n) extra space, where `n` is the size of the input.

Also See:

> [Find maximum length subarray having a given sum](https://www.techiedelight.com/find-maximum-length-sub-array-having-given-sum/ "Find maximum length subarray having a given sum")

> [Print continuous subarray with maximum sum](https://www.techiedelight.com/print-continuous-subarray-with-maximum-sum/ "Print continuous subarray with maximum sum")

> [Maximum Sum Circular Subarray](https://www.techiedelight.com/maximum-sum-circular-subarray/ "Maximum Sum Circular Subarray")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.64/5. Vote count: 213

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
