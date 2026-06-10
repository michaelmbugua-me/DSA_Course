# Find all symmetric pairs in an array of pairs

> Source: https://www.techiedelight.com/find-symmetric-pairs-array-pairs/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array of pairs of integers, find all symmetric pairs, i.e., pairs that mirror each other. For instance, pairs `(x, y)` and `(y, x)` are mirrors of each other.

For example,

**Input:** {3, 4}, {1, 2}, {5, 2}, {7, 10}, {4, 3}, {2, 5} **Output:** {4, 3} | {3, 4} {2, 5} | {5, 2}

> 

A naive solution would be to consider every pair and check if they are a mirror of each other or not. The time complexity of this solution is O(n2), where `n` is the size of the input.

We can solve this problem in linear time using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to consider every pair and insert the pair into a set. We also construct the mirror pair for every pair, and if the mirror pair is seen before (i.e., the mirror pair found in the set), print both pairs.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find all pairs that are a mirror of each other
const findPairs = (pairs: number[][]): void => {
    // create an empty set of strings
    const s = new Set<string>();

    // do for each pair
    for (const [x, y] of pairs) {
        // insert the current pair `(x, y)` into the set
        s.add(`{${x}, ${y}}`);

        // if mirror pair `(y, x)` is seen before, print the pairs
        if (s.has(`{${y}, ${x}}`)) {
            console.log(`{${x}, ${y}} | {${y}, ${x}}`);
        }
    }
};

const pairs = [[3, 4], [1, 2], [5, 2], [7, 10], [4, 3], [2, 5]];
findPairs(pairs);
```

**Output:** {4, 3} | {3, 4} {2, 5} | {5, 2}

The time complexity of the above solution is O(n) and requires O(n) extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
