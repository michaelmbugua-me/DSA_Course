# Find an index of the maximum occurring element with equal probability

> Source: https://www.techiedelight.com/find-index-maximum-occurring-element-equal-probability/

[Array](https://www.techiedelight.com/Category/Array/)

Given a non-empty integer array, find the index of the maximum occurring element with an equal probability.

For example, consider the input: `{4, 3, 6, 8, 4, 6, 2, 4, 5, 9, 7, 4}`. The maximum occurring element, 4, occurs at index 0, 4, 7, and 11. The solution should return any one of these indices with an equal probability. If there are two maximum occurring elements in the array, the solution should consider the first occurring maximum element.

> 

The problem looks complicated at first look but has a straightforward solution. Following is the algorithm:

  1. Store the count of each element of the input in a map.
  2. Traverse the map and find the first maximum occurring element.
  3. Generate a random number `k` between 1 and the count of the maximum occurring element.
  4. Traverse the input and return the index of the `k'th` occurrence of the maximum occurring element.

Following is a TypeScript implementation of the algorithm:

```ts
// Return the index of the maximum occurring element with equal probability
function findIndex(nums: number[]): number {

    // store count of each array element in a map
    const count = new Map<number, number>();
    for (const i of nums) {
        count.set(i, (count.get(i) || 0) + 1);
    }

    // traverse the array and find the first maximum occurring element
    let maxOccurring = nums[0];
    for (const i of nums) {
        if ((count.get(maxOccurring) as number) < (count.get(i) as number)) {
            maxOccurring = i;
        }
    }

    // generate a random number `k` between 1 and count of the maximum occurring element
    let k = Math.floor(Math.random() * (count.get(maxOccurring) as number)) + 1;

    // traverse the input array and return the index of the k'th
    // occurrence of the maximum occurring element
    let index = 0;
    while (k && index < nums.length) {
        if (nums[index] === maxOccurring) {
            k--;
        }
        index++;
    }

    return index - 1;
}

const nums = [4, 3, 6, 8, 4, 6, 2, 4, 5, 9, 7, 4];

for (let i = 0; i < 5; i++) {
    console.log('The index of the maximum occurring element is', findIndex(nums));
}
```

**Output (will vary):** The index of the maximum occurring element is 11 The index of the maximum occurring element is 4 The index of the maximum occurring element is 11 The index of the maximum occurring element is 0 The index of the maximum occurring element is 7

The time complexity of the proposed solution is O(n), where `n` is the input size and requires O(n) extra space for the map.

Also See:

> [Find the odd occurring element in an array in logarithmic time](https://www.techiedelight.com/find-odd-occurring-element-logn-time/ "Find the odd occurring element in an array in logarithmic time")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.92/5. Vote count: 237

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Hashing](https://www.techiedelight.com/Tags/Hashing/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
