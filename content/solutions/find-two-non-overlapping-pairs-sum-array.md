# Find two non-overlapping pairs having the same sum in an array

> Source: https://www.techiedelight.com/find-two-non-overlapping-pairs-sum-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an unsorted integer array, find two non-overlapping pairs in it having the same sum.

For example,

**Input:** { 3, 4, 7, 3, 4 } **Output:** (4, 3) and (3, 4) **Input:** { 3, 4, 7, 4 } **Output:** No non-overlapping pairs is present in the array The pairs (3, 4) and (3, 4) are overlapping as the index of 3 is the same in both pairs.

> 

The idea is to consider every pair of elements in the array one by one and insert it into a map. For each pair, check if their sum exists on the map or not. If we have encountered the sum before, and elements involved in previous occurrence `(m, n)` don’t overlap with the current pair `(i, j)`, print both the pairs and return.

Following is the TypeScript implementation of the program:

```ts
// Function to find two non-overlapping pairs with the same sum in a list
const findPairs = (nums: number[]): void => {
    // create an empty dictionary
    // key —> sum of a pair of elements in the list
    // value —> list storing an index of every pair having that sum
    const d = new Map<number, [number, number][]>();

    // consider every pair (nums[i], nums[j]), where `j > i`
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            // calculate the sum of the current pair
            const total = nums[i] + nums[j];

            // if the sum is already present on the dictionary
            if (d.has(total)) {
                // check every pair for the desired sum
                for (const [m, n] of d.get(total)!) {
                    // if pairs don't overlap, print and return them
                    if ((m !== i && m !== j) && (n !== i && n !== j)) {
                        console.log('First Pair', `(${nums[i]}, ${nums[j]})`);
                        console.log('Second Pair', `(${nums[m]}, ${nums[n]})`);
                        return;
                    }
                }
            }

            // insert the current pair into the dictionary
            if (!d.has(total)) {
                d.set(total, []);
            }
            d.get(total)!.push([i, j]);
        }
    }

    console.log('No non-overlapping pairs present');
};

const nums = [3, 4, 7, 3, 4];
findPairs(nums);
```

**Output:** First Pair (4, 3) Second Pair (3, 4)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.73/5. Vote count: 147

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
