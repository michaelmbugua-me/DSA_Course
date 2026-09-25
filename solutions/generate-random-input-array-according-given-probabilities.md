# Generate random input from an array according to given probabilities

> Source: https://www.techiedelight.com/generate-random-input-array-according-given-probabilities/

Write an algorithm to generate any one of the given `n` numbers according to given probabilities.

For example, consider the following integer array and their probabilities. The solution should return 1 with `30%` probability, 2 with `10%` probability, 3 with `20%` probability, and so on for every array element.

nums[] = { 1, 2, 3, 4, 5 }; probability[] = { 30, 10, 20, 15, 25 }; // total probability should sum to 100%

> 

Algorithm:

  1. Construct a sum array `S[]` from the given probability array `P[]`, where `S[i]` holds the sum of all `P[j]` for `0 <= j <= i`.
  2. Generate a random integer from 1 to 100 and check where it lies in `S[]`.
  3. Based on the comparison result, return the corresponding element from the input array.

The implementation can be seen below in TypeScript:

```ts
// Generates a pseudo-random integer in range `[min, max]`
function rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random nums from a list according to the
// given probabilities
function random(nums: number[], probability: number[]): number {

    const n = nums.length;
    if (n !== probability.length) {
        return -1;               // error
    }

    // construct a sum list from the given probabilities
    const prob_sum: number[] = new Array(n).fill(0);

    // `prob_sum[i]` holds sum of all `probability[j]` for `0 <= j <=i`
    prob_sum[0] = probability[0];
    for (let i = 1; i < n; i++) {
        prob_sum[i] = prob_sum[i - 1] + probability[i];
    }

    // generate a random integer from 1 to 100
    // and check where it lies in `prob_sum`
    const r = rand(1, 100);

    // based on the comparison result, return the corresponding
    // element from the input list

    if (r <= prob_sum[0]) {        // handle 0th index separately
        return nums[0];
    }

    for (let i = 1; i < n; i++) {
        if (r > prob_sum[i - 1] && r <= prob_sum[i]) {
            return nums[i];
        }
    }

    return -1;
}

// Input: list of integers and their probabilities
// Goal: generate `nums[i]` with probability equal to `probability[i]`

const nums = [1, 2, 3, 4, 5];
const probability = [30, 10, 20, 15, 25];

// maintain a frequency map to validate the results
const freq = new Map<number, number>();

// make 1000000 calls to the `random()` function and store results in a map
for (let i = 0; i < 1000000; i++) {
    const val = random(nums, probability);
    freq.set(val, (freq.get(val) ?? 0) + 1);
}

// print the results
for (let i = 0; i < nums.length; i++) {
    console.log(`${nums[i]} ~ ${(freq.get(nums[i])! / 10000).toFixed(2)}%`);
}
```

**`Output (will vary):`** 1 ~ 30.3368% 2 ~ 10.063% 3 ~ 20.1714% 4 ~ 15.1579% 5 ~ 24.2709%

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.65/5. Vote count: 286

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
